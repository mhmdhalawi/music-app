import { useStore } from '../store';
import { supabase } from '../lib/supabase';
import { ref } from 'vue';

export const useUpload = () => {
  const store = useStore();
  const userID = store.user?.id;
  const is_dragover = ref(false);

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
      store.toggleToast('Uploaded successfully!', 'green');
    }, 800);
  };

  return { filesData: store.filesData, upload, is_dragover, showProgressBar, progress };
};
