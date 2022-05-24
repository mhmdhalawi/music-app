import { useStore } from '../store';
import { supabase } from '../lib/supabase';
import { reactive, ref } from 'vue';
import { IAlert } from '../types/reactive';

export const useUpload = () => {
  const store = useStore();
  const userID = store.user?.id;
  const is_dragover = ref(false);

  const alert = reactive<IAlert>({
    show: false,
    message: 'Uploaded successfully',
    bgColor: 'bg-green-400',
  });
  const showProgressBar = ref(false);
  const progress = ref(0);
  const incrementBy = ref(0);

  const upload = async (e: DragEvent) => {
    showProgressBar.value = true;
    const files = Array.from(e.dataTransfer?.files || []);
    incrementBy.value = 100 / files.length;
    is_dragover.value = false;

    for (const file of files) {
      if (file.type !== 'audio/mpeg') {
        return;
      }
      const { data } = await supabase
        .from('songs')
        .insert([{ song_name: file.name, user_id: userID }]);
      if (data) {
        await supabase.storage.from('songs').upload(`${userID}/${data[0].id}-${file.name}`, file);
        if (progress.value + incrementBy.value >= 100) {
          progress.value = 100;
        } else {
          progress.value += incrementBy.value;
        }

        store.setFilesData(data);
      }
    }
    setTimeout(() => {
      showProgressBar.value = false;
      progress.value = 0;
      alert.show = true;
    }, 800);
    setTimeout(() => (alert.show = false), 2000);
  };

  return { filesData: store.filesData, upload, is_dragover, showProgressBar, progress, alert };
};
