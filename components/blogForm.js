import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";

export default function BlogForm({
  _id,
  title: existingTitle,
  author: existingAuthor,
  intro: existingIntro,
  outro:existingOutro,
  sections: existingSections,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [author, setAuthor] = useState(existingAuthor || "");
  const [intro, setIntro] = useState(existingIntro|| "");
  const [outro, setOutro] = useState(existingOutro|| "");
  const [sections, setSections] = useState(existingSections || []);
  const [goToBlog, setGoToBlog] = useState(false);
  const [isUploading, setIsUploading] = useState([]);
  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
        title,
        author,
        intro,
        sections,
        outro
    };

    if (_id) {
      //update
      await axios
        .put("/api/blog", { ...data, _id })
        .then(setGoToBlog(true));
    } else {
      //create
      await axios.post("/api/blog", data).then(setGoToBlog(true));
    }
  }

  if (goToBlog) {
    router.push("/blog");
  }
  async function uploadImages(ev, index) {
    setIsUploading((prev) => {
      const newIsUploading = [...isUploading];
      newIsUploading[index] = true;
      return newIsUploading;
    });
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
        setSections((prev) => {
          const sections = [...prev];
          sections[index].image = res.data[0].toString();
          return sections;
        });}
        setIsUploading((prev) => {
            const newIsUploading = [...isUploading];
            newIsUploading[index] = false;
            return newIsUploading;
          });
  };

  function addSection() {
    setSections((prev) => {
      return [
        ...prev,
        {
          header: "",
          content: "",
          image: ""
        },
      ];
    });
    setIsUploading((prev) => {
      return [...prev, false];
    });
  }
  function handleSectionsHeaderChange(index, newHeader) {
    setSections((prev) => {
      const sections = [...prev];
      sections[index].header = newHeader;
      return sections;
    });
  }

  function handleSectionsContentChange(index, newContent) {
    setSections((prev) => {
      const sections = [...prev];
      sections[index].content = newContent;
      return sections;
    });
  }

  function removeSection(indexToRemove) {
    setSections((prev) => {
      const newSections = [...prev];
      newSections.splice(indexToRemove, 1);
      return newSections;
    });
    setIsUploading((prev) => {
      const newIsUploading = [...prev];
      newIsUploading.pop(false);
      return newIsUploading;
    });
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Blog Title</label>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
        <label>Blog Author</label>
        <input
          type="text"
          placeholder="author"
          value={author}
          onChange={(ev) => setAuthor(ev.target.value)}
        />
      <label>Blog Intro</label>
      <textarea
        rows={5}
        placeholder="intoduction"
        value={intro}
        onChange={(ev) => setIntro(ev.target.value)}
      />
      <div className="mb-2">
        <label className="block">Blog Sections</label>
        <button
          className="btn-default w-[180px] text-sm mb-2"
          type="button"
          onClick={addSection}
        >
          Add new Section
        </button>
        {sections.length > 0 &&
          sections.map((s, index) => {
            return (
              <div
                key={index}
                className=" gap-1 mb-5 ml-5 bg-blue-300 grid p-5 rounded-lg shadow-md 	 "
              >
                <div className="mb-2 flex flex-wrap gap-1">
                  {s.image && (
                    <div
                      key={s.image}
                      className="h-24 relative rounded-sm p-4 bg-white border border-gray-200 shadow-sm"
                    >
                      <div className="absolute top-[-10%] text-primary right-0 p-1 cursor-pointer" onClick={() => {setSections((prev) => {
                            const newSections = [...prev];
                            newSections[index].image = "";
                            return newSections;
                          })}}>x</div>
                      <img src={s.image} alt="" className="rounded-lg" />
                    </div>
                  )}

                  {isUploading[index] && (
                    <div className="h-24 w-24 flex items-center justify-center p-1 bg-white rounded-sm border border-gray-200 shadow-sm">
                      <Spinner />
                    </div>
                  )}
                  {!s.image && !isUploading[index] && (
                    <label className="w-[250px] h-[80px] p-2  flex flex-col items-center cursor-pointer justify-center text-sm gap-1 text-primary rounded-ms bg-white shadow-sm border border-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      <div>Add Image (optional)</div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(ev) => {
                          uploadImages(ev, index);
                        }}
                      ></input>
                    </label>
                  )}
                </div>
                <div>
                  <label>Section Header</label>
                  <input
                    type="text"
                    placeholder="section header"
                    value={sections[index].header}
                    onChange={(ev) =>
                      handleSectionsHeaderChange(index, ev.target.value)
                    }
                  />
                  <label>Section Content</label>
                  <textarea
                    rows={10}
                    placeholder="section sontent"
                    value={sections[index].content}
                    onChange={(ev) =>
                      handleSectionsContentChange(index, ev.target.value)
                    }
                  />
                </div>
                <button
                  className="btn-red h-max w-max "
                  type="button"
                  onClick={() => {
                    removeSection(index);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
      <label>Blog Outro</label>
      <textarea
        rows={5}
        placeholder="outro"
        value={outro}
        onChange={(ev) => setOutro(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
