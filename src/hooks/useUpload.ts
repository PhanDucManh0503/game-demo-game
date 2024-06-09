import { StorageAPI } from 'src/api/storageAPI';

function getExtension(filename: string) {
  const parts = filename.split('.');
  return '.' + parts[parts.length - 1];
}

const useUpload = () => {
  const uploadFile = async (
    files: any[],
    file_name: string | null,
    onSuccess: (
      isSucess: boolean,
      files: { file_name: string; file_path: string }[],
    ) => void,
  ) => {
    try {
      const body = new FormData();
      files.forEach((file) => {
        const newFile = new File(
          [file],
          file_name ? file_name + getExtension(file.name) : file.name,
          {
            type: file.type,
          },
        );
        body.append('files', newFile);
      });
      const res: any = await StorageAPI.upload(body);
      onSuccess(true, res?.files);
    } catch (error) {
      onSuccess(false, []);
    }
  };

  return { uploadFile };
};

export default useUpload;
