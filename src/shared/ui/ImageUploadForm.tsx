import { CommonInput } from './CommonInput';

type ImageUploadForm = React.ComponentProps<'input'> & {
  previewUrl?: string;
};

export const ImageUploadForm = ({ previewUrl, ...rest }: ImageUploadForm) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <div className="flex flex-col items-center gap-y-2">
          <label
            htmlFor="imageInput"
            className="px-4 py-2 text-[14px] font-medium text-white bg-blue-500 rounded-md"
          >
            {previewUrl ? '이미지 재업로드' : '이미지 업로드'}
          </label>
        </div>
        {previewUrl && (
          <div className="flex justify-center items-center w-[200px] h-[200px] rounded-full overflow-hidden bg-white border-3 border-white shadow-md shadow-gray-300">
            <img src={previewUrl} alt="미리보기 이미지" />
          </div>
        )}
      </div>
      <CommonInput
        id="imageInput"
        type="file"
        className="hidden"
        accept="image/*"
        {...rest}
      />
    </>
  );
};
