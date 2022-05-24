import { useStore } from '../store';
import { supabase } from '../lib/supabase';
import { ref } from 'vue';

export const useUpload = () => {
  const store = useStore();
  const userID = store.user?.id;
  const is_dragover = ref(false);

  const upload = (e: DragEvent) => {
    const files = Array.from(e.dataTransfer?.files || []);
    is_dragover.value = false;

    files.forEach(async (file) => {
      if (file.type !== 'audio/mpeg') {
        return;
      }
      const { data } = await supabase
        .from('songs')
        .insert([{ song_name: file.name, user_id: userID }]);
      if (data) {
        await supabase.storage.from('songs').upload(`${userID}/${data[0].id}-${file.name}`, file);
        store.setFilesData(data);
      }
    });
  };

  return { filesData: store.filesData, upload, is_dragover };
};
