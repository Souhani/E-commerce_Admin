import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import { useEdgeStore } from '../lib/edgestore';
import Link from "next/link";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  machines: assignedMachines,
  thumbnail: existingThumbnail,
  subtitle: existingSubtitle,
  features: assignedFeatures,
  properties: assignedexistingDetails,
  testimonials: existingTestimonials,
  files: existingFiles,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [subtitle, setSubtitle] = useState(existingSubtitle || "");
  const [machines, setMachines] = useState(assignedMachines || "");
  const [thumbnail, setThumbnail] = useState(existingThumbnail || "");
  const [features, setFeatures] = useState(assignedFeatures || []);
  const [details, setDetails] = useState(assignedexistingDetails || []);
  const [testimonials, setTestimonials] = useState(existingTestimonials || []);
  const [files, setFiles] = useState(existingFiles || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(new Array(1).fill(false));
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      subtitle,
      machines,
      thumbnail,
      features,
      properties: details,
      testimonials,
      files
    };
   console.log("ddddta", data)
    if (_id) {
      //update
      await axios
        .put("/api/products", { ...data, _id })
        .then(setGoToProducts(true));
    } else {
      //create
      await axios.post("/api/products", data).then(setGoToProducts(true));
    }
  }

  if (goToProducts) {
    router.push("/");
  }
  async function uploadFile (e, index) {
    setIsUploading((prev) => {
      const newIsUploading = [...isUploading];
      newIsUploading[index + details.length + testimonials.length + 1] = true;
      return newIsUploading;
    });
    const file = e.target.files?.[0];
    const res = await edgestore.publicFiles.upload({
      file,
      onProgressChange: (progress) => {
        // you can use this to show a progress bar
        console.log(progress);
      },
    });
    setFiles((prev) => {
      const files = [...prev];
      files[index].file = res.url;
      return files;
    });
    // you can run some server action or api here
    // to add the necessary data to your database
    setIsUploading((prev) => {
      const newIsUploading = [...isUploading];
      newIsUploading[index + details.length + testimonials.length + 1] = false;
      return newIsUploading;
    });
  }
  async function uploadImages(ev, component, componentIndex, arrayIndex) {
    setIsUploading((prev) => {
      const newIsUploading = [...isUploading];
      newIsUploading[arrayIndex] = true;
      return newIsUploading;
    });
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      if (component === "thumbnail") {
        setThumbnail(res.data[0].toString());
      }
      if (component === "properties") {
        setDetails((prev) => {
          const detaild = [...prev];
          detaild[componentIndex].image = res.data[0].toString();
          return detaild;
        });
      }
      if (component === "testimonials") {
        setTestimonials((prev) => {
          const testimonials = [...prev];
          testimonials[componentIndex].user.image =res.data[0].toString();
          return testimonials;
        });
      }}
    setIsUploading((prev) => {
      const newIsUploading = [...isUploading];
      newIsUploading[arrayIndex] = false;
      return newIsUploading;
    });
  }

  function addFeature() {
    setFeatures((prev) => {
      return [...prev, { title: "" }];
    });
  }

  function handleFeatureNameChange(index, newName) {
    setFeatures((prev) => {
      const features = [...prev];
      features[index].title = newName;
      return features;
    });
  }

  function removeFeature(indexToRemove) {
    setFeatures((prev) => {
      const newFeatures = [...prev];
      console.log(newFeatures, indexToRemove)
      newFeatures.splice(indexToRemove, 1);
      return newFeatures;
    });
  }

  function addDetails() {
    setDetails((prev) => {
      return [
        ...prev,
        {
          property: {
            title: "",
            description: "",
          },
          image: "",
        },
      ];
    });
    setIsUploading((prev) => {
      return [...prev, false];
    });
  }
  function handlePropertiesTitleChange(index, newTitle) {
    setDetails((prev) => {
      const details = [...prev];
      details[index].property.title = newTitle;
      return details;
    });
  }

  function handlePropertiesDescriptionChange(index, newDescription) {
    setDetails((prev) => {
      const details = [...prev];
      details[index].property.description = newDescription;
      return details;
    });
  }

  function removeDetails(indexToRemove) {
    setDetails((prev) => {
      const newDetails = [...prev];
      newDetails.splice(indexToRemove, 1);
      return newDetails;
    });
    setIsUploading((prev) => {
      const newIsUploading = [...prev];
      newIsUploading.pop(false);
      return newIsUploading;
    });
  }

  function addTestimonial() {
    setTestimonials((prev) => {
      return [
        ...prev,
        {
          comment: "",
          user: {
            name: "",
            image: "",
          },
        },
      ];
    });
    setIsUploading((prev) => {
      return [...prev, false];
    });
  }


  function removeTestimonial(indexToRemove) {
    setTestimonials((prev) => {
      const newTestimonials = [...prev];
      newTestimonials.splice(indexToRemove, 1);
      return newTestimonials;
    });
    setIsUploading((prev) => {
      const newIsUploading = [...prev];
      newIsUploading.pop(false);
      return newIsUploading;
    });
  }

  function handleTestimonialNameChange(index, newName) {
    setTestimonials((prev) => {
      const testimonials = [...prev];
      testimonials[index].user.name = newName;
      return testimonials;
    });
  }

  function handleTestimonialCommentChange(index, newComment) {
    setTestimonials((prev) => {
      const testimonials = [...prev];
      testimonials[index].comment = newComment;
      return testimonials;
    });
  }

  function addFile() {
    setFiles((prev) => {
      return [
        ...prev,
        {
          machine: "",
          version: "",
          file: "",
          size: "",
        },
      ];
    });
  }

  function removeFile(indexToRemove) {
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(indexToRemove, 1);
      return newFiles;
    });
  }


  return (
    <form onSubmit={saveProduct}>
      <label>Product Title</label>
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>
        <label>Product Subtitle</label>
        <input
          type="text"
          placeholder="Product Subtitle"
          value={subtitle}
          onChange={(ev) => setSubtitle(ev.target.value)}
        />
        Product Machines
      </label>
      <input
        type="text"
        placeholder="Product Machines"
        value={machines}
        onChange={(e) => setMachines(e.target.value)}
      />
      <label>Product Thumbnail (SIZE: 450x200)</label>
      <div className="mb-2 flex flex-wrap gap-1">
        {thumbnail && (
          <div
            key={thumbnail}
            className="h-24 relative rounded-sm p-4 bg-white border border-gray-200 shadow-sm"
          >
            <div className="absolute top-[-10%] text-primary right-0 p-1 cursor-pointer" onClick={() => {setThumbnail("")}}>x</div>
            <img src={thumbnail} alt="" className="rounded-lg" />
          </div>
        )}

        {isUploading[0] && (
          <div className="h-24 w-24 flex items-center justify-center p-1 bg-white rounded-sm border border-gray-200 shadow-sm">
            <Spinner />
          </div>
        )}
        {!thumbnail && !isUploading[0] && (
          <label className="w-24 h-24  flex flex-col items-center cursor-pointer justify-center text-sm gap-1 text-primary rounded-ms bg-white shadow-sm border border-primary">
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
            <div>Add Image</div>
            <input
              type="file"
              className="hidden"
              onChange={(ev) => {
                uploadImages(ev, "thumbnail", null, 0);
              }}
            ></input>
          </label>
        )}
      </div>
      <label>Product Description</label>
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <div className="mb-2">
        <label className="block">Product Properties</label>
        <button
          className="btn-default w-[180px] text-sm mb-2"
          type="button"
          onClick={addDetails}
        >
          Add new Property
        </button>
        {details.length > 0 &&
          details.map((d, index) => {
            return (
              <div
                key={index}
                className=" gap-1 mb-5 ml-5 bg-blue-300 grid p-5 rounded-lg shadow-md 	 "
              >
                <div className="mb-2 flex flex-wrap gap-1">
                  {d.image && (
                    <div
                      key={d.image}
                      className="h-24 relative rounded-sm p-4 bg-white border border-gray-200 shadow-sm"
                    >
                          <div className="absolute top-[-10%] text-primary right-0 p-1 cursor-pointer" onClick={() => {setDetails((prev) => {
                            const newDetails = [...prev];
                            newDetails[index].image = "";
                            return newDetails;
                          })}}>x</div>
                      <img src={d.image} alt="" className="rounded-lg" />
                    </div>
                  )}

                  {isUploading[index + 1] && (
                    <div className="h-24 w-24 flex items-center justify-center p-1 bg-white rounded-sm border border-gray-200 shadow-sm">
                      <Spinner />
                    </div>
                  )}
                  {!d.image && !isUploading[index + 1] && (
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
                      <div>Add Image</div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(ev) => {
                          uploadImages(ev, "properties", index, index + 1);
                        }}
                      ></input>
                    </label>
                  )}
                </div>
                <div>
                  <label>Property Title</label>
                  <input
                    type="text"
                    placeholder="property title"
                    value={details[index].property.title}
                    onChange={(ev) =>
                      handlePropertiesTitleChange(index, ev.target.value)
                    }
                  />
                  <label>Property Description</label>
                  <textarea
                    rows={5}
                    placeholder="property description"
                    value={details[index].property.description}
                    onChange={(ev) =>
                      handlePropertiesDescriptionChange(index, ev.target.value)
                    }
                  />
                </div>
                <button
                  className="btn-red h-max w-max "
                  type="button"
                  onClick={() => {
                    removeDetails(index);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
      <div className="mb-2">
        <label className="block">Product Features</label>
        <button
          className="btn-default w-[180px] text-sm mb-2"
          type="button"
          onClick={addFeature}
        >
          Add new feature
        </button>
        {features.length > 0 &&
          features.map((feature, index) => {
            return (
              <div key={index} className="flex gap-1 ml-5 mb-2">
                <input
                  onChange={(ev) => {
                    handleFeatureNameChange(index, ev.target.value);
                  }}
                  type="text"
                  value={feature.title}
                  placeholder="feature"
                  className="mb-0"
                />
                <button
                  className="btn-red"
                  type="button"
                  onClick={() => {
                    removeFeature(index);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
      <div className="mb-2">
        <label className="block">Product Testimonials</label>
        <button
          className="btn-default w-[180px] text-sm mb-2"
          type="button"
          onClick={addTestimonial}
        >
          Add new Testimonial
        </button>
        {testimonials.length > 0 &&
          testimonials.map((t, index) => {
            return (
              <div
                key={index}
                className=" gap-1 mb-5 ml-5   bg-gray-300 grid p-5 rounded-lg shadow-md 	 "
              >
                <div className="mb-2 flex flex-wrap gap-1">
                  {t.user.image && (
                    <div
                      key={t.user.image}
                      className="h-24 relative rounded-sm p-4 bg-white border border-gray-200 shadow-sm"
                    >
                      <div className="absolute top-[-10%] text-primary right-0 p-1 cursor-pointer" onClick={() => {setTestimonials((prev) => {
                            const newTestimonials = [...prev];
                            newTestimonials[index].user.image = "";
                            return newTestimonials;
                          })}}>x</div>
                      <img src={t.user.image} alt="" className="rounded-lg" />
                    </div>
                  )}

                  {isUploading[details.length + index + 1] && (
                    <div className="h-24 w-24 flex items-center justify-center p-1 bg-white rounded-sm border border-gray-200 shadow-sm">
                      <Spinner />
                    </div>
                  )}
                  {!t.user.image &&
                    !isUploading[details.length + index + 1] && (
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
                        <div>User image</div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(ev) => {
                            uploadImages(
                              ev,
                              "testimonials",
                              index,
                              details.length + index + 1
                            );
                          }}
                        ></input>
                      </label>
                    )}
                </div>
                <div>
                  <label>User Name</label>
                  <input
                    type="text"
                    placeholder="user name"
                    value={testimonials[index].user.name}
                    onChange={(ev) =>
                      handleTestimonialNameChange(index, ev.target.value)
                    }
                  />
                  <label>User Comment</label>
                  <textarea
                    placeholder="user comment"
                    value={testimonials[index].comment}
                    onChange={(ev) =>
                      handleTestimonialCommentChange(index, ev.target.value)
                    }
                  />
                </div>
                <button
                  className="btn-red h-max w-max "
                  type="button"
                  onClick={() => {
                    removeTestimonial(index);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
      {/* {teble} */}
      <div className="mb-2 ">
        <label className="block ">Product Files</label>
        <button
          className="btn-default w-[180px] text-sm mb-2"
          type="button"
          onClick={addFile}
        >
          Add new File
        </button>
        {files.length>0 &&
        <table className="basic mt-2 sm:!text-[15px] !text-[10px]">
        <thead>
          <tr>
            <td className="sm:!text-[15px] !text-[10px]">Operating Systems</td>
            <td className="sm:!text-[15px] !text-[10px]">Version</td>
            <td className="sm:!text-[15px] !text-[10px]">Size</td>
            <td className="sm:!text-[15px] !text-[10px]">Upload file</td>
            <td className="sm:!text-[15px] !text-[10px]">Remove</td>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 &&
            files.map((f, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                    className="sm:!text-[15px] !text-[10px]"
                      type="text"
                      placeholder="Machine"
                      value={f.machine}
                      onChange={(e) => {
                        setFiles(prev => {
                          const newFiles = [...prev];
                          newFiles[index].machine = e.target.value;
                          return newFiles
                        })
                      }}
                    />{" "}
                  </td>
                  <td>
                    <input
                    className="sm:!text-[15px] !text-[10px]"
                      type="text"
                      placeholder="Version"
                      value={f.version}
                      onChange={(e) => {
                        setFiles(prev => {
                          const newFiles = [...prev];
                          newFiles[index].version = e.target.value;
                          return newFiles
                        })
                      }}
                    />
                  </td>
                  <td>
                    <input
                    className="sm:!text-[15px] !text-[10px]"
                      type="text"
                      placeholder="Size"
                      value={f.size}
                      onChange={(e) => {
                        setFiles(prev => {
                          const newFiles = [...prev];
                          newFiles[index].size = e.target.value;
                          return newFiles
                        })
                      }}
                    />
                  </td>
                  <td>
                  <div className="mb-2 flex justify-center flex-wrap gap-1">
                  {f.file && (
                    <div
                      key={f.file}
                      className="h-[30px] text-primary relative w-max rounded-sm  bg-white border border-gray-200 shadow-sm"
                    >
                      <div className="absolute top-[-35%] text-primary right-0 p-1 cursor-pointer" onClick={() => {setFiles((prev) => {
                            const newFiles = [...prev];
                            newFiles[index].file = "";
                            return newFiles;
                          })}}>x</div>
                      <Link href={f.file}>
                      <p className="sm:!text-[15px] !text-[10px] ">{f.file.split("/")[f.file.split("/").length-1].split('.')[0]}</p>
                      </Link>
                    </div>
                  )}

                  {isUploading[details.length + testimonials.length + index + 1] && (
                    <div className="h-[30px] w-24 flex items-center sm:!text-[15px] !text-[10px] justify-center p-1 bg-white rounded-sm border border-gray-200 shadow-sm">
                      <Spinner />
                    </div>
                  )}
                  {!f?.file &&
                    !isUploading[details.length  + testimonials.length + index + 1] && (
                      <label className="sm:w-[150px] h-[30px] p-2  sm:flex gap-4  items-center cursor-pointer justify-center text-sm  text-primary rounded-ms bg-white shadow-sm border border-primary">
                                                <div className="hidden sm:block font-bold sm:!text-[15px] !text-[10px] ">Upload File</div>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="sm:w-6 sm:h-6 h-3 w-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            uploadFile(e, index);
                          }}
                        ></input>
                      </label>
                    )}
                </div>
                  </td>
                  <td >
                  <button
                  className="btn-red sm:!text-[15px] !text-[10px] h-max w-max "
                  type="button"
                  onClick={() => {
                    removeFile(index);
                  }}
                >
                  Remove
                </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>}
      </div>
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
