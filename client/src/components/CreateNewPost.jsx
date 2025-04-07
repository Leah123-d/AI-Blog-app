//To-do: 
//conditional render image portion, send the data to the post route to update URL
//have a button to view post or click home

import { useReducer, useRef } from "react";

const initialState = {
  author: "",
  title: "",
  content: "",
  favorite: false,
  comments: "",
}; //intial start for states

function formReducer(state, action) {
  switch (action.type) {
    case "FormInput": {
      return {
        ...state,
        [action.formInput.name]: action.formInput.value,
      };
    }
    case "Reset":
      return { ...initialState };

    default:
      throw new Error("invalid action type");
  }
}

function CreateNewPost({ createNewPost }) {
  const [formState, dispatchForm] = useReducer(formReducer, initialState); //dispatch to our reducer function
  //form is being changed dynamically in formState
  const formRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formState.author || !formState.title || !formState.content) {
      alert("please complete all required fields");
      return;
    }

    createNewPost(formState);
    dispatchForm({
      type: "Reset",
    });
    formRef.current.reset();
  };

  function formChange(e) {
    dispatchForm({
      type: "FormInput",
      formInput: { name: e.target.name, value: e.target.value },
    });
  }

  return (
    <div className="formContainer">
      <form onSubmit={onSubmit} onChange={formChange} ref={formRef}>
        <label htmlFor="author">
          Author<span className="req">*</span>
        </label>
        <input id="author" type="text" name="author" required />
        <label htmlFor="title">
          Title <span className="req">*</span>
        </label>
        <input id="title" type="text" name="title" required />
        <label htmlFor="content">
          content<span className="req">*</span>
        </label>
        <input id="content" type="text" name="content" className="content" required />
        <p>
          <span className="req">*</span> - Required field
        </p>
        <button type="submit">Create post</button>
      </form>
    </div>
  );
}

export default CreateNewPost;
