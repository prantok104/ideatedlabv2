"use client";

import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useField } from "formik";

const CKEditorComponent = ({ name, ...props }) => {
  const [field, , helpers] = useField(name);
  const [editorData, setEditorData] = useState(field.value);

  useEffect(() => {
    setEditorData(field.value);
  }, [field.value]);

  const handleChange = (event, editor) => {
    const data = editor.getData();
    helpers.setValue(data);
    setEditorData(data);
  };

  return (
    <div className="my-2 ck-editor__editable">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default CKEditorComponent;
