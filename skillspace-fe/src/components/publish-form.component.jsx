import { Toaster, toast } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";
import Tag from "./tags.component";

const PublishForm = () => {
  let tagLimit = 10;
  let charecterLimit = 200;
  let {
    blog,
    blog: { banner, title, tags, des },
    setEditorState,
    setBlog,
  } = useContext(EditorContext);
  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  const handleBlogDescChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let tag = e.target.value;
      if (tags.length < tagLimit) {
        if(!tags.includes(tag) && tag.length) {
          setBlog({...blog, tags: [...tags, tag]})
        }
      } else {
        toast.error(`You can add max ${tagLimit} Tags`)
      }
      e.target.value = "";
    }
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <i class="fi fi-br-cross"></i>
        </button>
        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>
        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            className="select-box pl-4"
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            onChange={handleBlogTitleChange}
          />

          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>
          <textarea
            maxLength={charecterLimit}
            defaultValue={des}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleBlogDescChange}
            onKeyDown={handleTitleKeyDown}
          ></textarea>
          <p className="mt-1 text-dark-grey text-sm text-right">
            {charecterLimit - des.length} charecters left
          </p>
          <p className="text-dark-grey mb-2 mt-9">
            Topics - (Helps is searching and raking your blog post)
          </p>
          <div className="relative input-box pl-2 py-2 pb-4 placeholder-gray-50">
            <input 
              type="text"
              placeholder="Topic"
              className="placeholder-gray-100 backdrop:placeholder-opacity-100 sticky select-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleKeyDown}
            />

            {tags.map((tag, i) => {
              return <Tag tag={tag} key={i} />;
            })}

            <Tag tag="testing tag" />
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
