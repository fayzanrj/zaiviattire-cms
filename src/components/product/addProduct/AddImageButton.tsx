import React from "react";

// Props
interface AddImageButtonProps {
  inputRef: React.ForwardedRef<HTMLInputElement>;
}

const AddImageButton: React.FC<AddImageButtonProps> = ({ inputRef }) => {
  return (
    // Add button
    <button
      type="button"
      className="w-32 h-32 my-2 rounded-md bg-stone-300"
      // @ts-ignore
      onClick={() => inputRef?.current?.click()}
    >
      <span>Add Image</span>
    </button>
  );
};

export default AddImageButton;
