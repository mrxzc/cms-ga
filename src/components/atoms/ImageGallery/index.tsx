'use client'

// import React, { useState, ChangeEvent, useEffect } from 'react';
// import Image from 'next/image';
// import { toast } from 'react-toastify';

// import IconPlus from '@assets/icons/IconPlus';
// import images from '@assets/images';

// interface ImageCardProps {
//   file: File | null;
//   index: number;
//   onUpload: (index: number, file: File) => void;
//   onClose: (index: number) => void;
//   isMain: boolean;
//   onSetMain: (index: number) => void;
// }

// const ImageCard: React.FC<ImageCardProps> = ({ file, index, onUpload, onClose, isMain, onSetMain }) => {
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = e => {
//         setImageUrl(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImageUrl(null); // Reset imageUrl if file is null
//     }
//   }, [file]);

//   const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]; // Take only the first file
//     if (file) {
//       const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//       const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

//       if (!allowedTypes.includes(file.type)) {
//         toast.error('Format file harus .png, .jpeg, atau .jpg');
//         return;
//       }

//       if (file.size > maxSizeInBytes) {
//         toast.error('Ukuran file maksimal 5MB');
//         return;
//       }

//       onUpload(index, file);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center rounded-lg shadow-md w-[125px] h-[125px] mr-2">
//       {imageUrl ? (
//         <Image
//           width={125}
//           height={125}
//           src={imageUrl}
//           alt="Gambar Ruangan"
//           className="w-[125px] h-[125px] object-cover"
//         />
//       ) : (
//         <label htmlFor={`fileInput-${index}`} className="cursor-pointer w-full h-full flex items-center justify-center">
//           <div
//             className="border border-[#d5d5d5] rounded grid place-items-center w-full h-full items-center justify-left bg-[#f9f8ff]"
//             onKeyDown={() => { }}
//             role="button"
//             tabIndex={0}
//           >
//             <IconPlus width={52} height={52} color="#505050" />
//           </div>
//           <input
//             type="file"
//             id={`fileInput-${index}`}
//             accept="image/png, image/jpeg, image/jpg"
//             onChange={handleFileInputChange}
//             className="hidden"
//           />
//         </label>
//       )}

//       <div className="absolute top-2 flex justify-between w-full px-2">
//         <button
//           type="button"
//           className={`bg-gray-200 px-2 py-1 rounded-md text-extra-small regular-12 border ${isMain ? 'border-[#4c1eff] text-[#4c1eff]' : 'border-gray-400 text-gray-600'}`}
//           onClick={() => onSetMain(index)}
//         >
//           {isMain ? 'Foto Utama' : 'Jadikan Utama'}
//         </button>
//         {file && (
//           <Image
//             src={images.ERASE_IMAGE}
//             width={12}
//             height={12}
//             alt="Delete Icon"
//             className="hover:cursor-pointer absolute top-2 right-2"
//             onClick={() => onClose(index)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// const ImageGallery: React.FC<{ images: (File | null)[], setImages: (images: (File | null)[]) => void; }> = ({ images, setImages }) => {
//   const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

//   useEffect(() => {
//     // Jika belum ada gambar utama, dan ada gambar yang diunggah, set gambar pertama sebagai gambar utama
//     if (mainImageIndex === null && images.some(image => image !== null)) {
//       setMainImageIndex(images.findIndex(image => image !== null));
//     }
//   }, [images]);

//   const handleUpload = (index: number, file: File) => {
//     const newImages = [...images];
//     newImages[index] = file;
//     setImages(newImages);

//     // Jika belum ada gambar utama, jadikan gambar pertama yang diunggah sebagai gambar utama
//     if (mainImageIndex === null) {
//       setMainImageIndex(index);
//     }
//   };

//   const handleCloseImage = (index: number) => {
//     const newImages = [...images];
//     newImages[index] = null;
//     setImages(newImages);

//     if (index === mainImageIndex) {
//       setMainImageIndex(null);
//     }
//   };

//   const handleSetMain = (index: number) => {
//     setMainImageIndex(index);
//   };

//   return (
//     <div className="mx-auto">
//       <div className="grid grid-cols-5 gap-4 mb-4 w-[650px]">
//         {images.map((image, index) => (
//           <ImageCard
//             key={index}
//             file={image}
//             index={index}
//             onUpload={handleUpload}
//             onClose={handleCloseImage}
//             isMain={index === mainImageIndex}
//             onSetMain={handleSetMain}
//           />
//         ))}
//       </div>
//       {/* <p className="mt-2 text-center w-[175px]">Format (.png / .jpeg / .jpg ) size max 5MB & ratio 2:1</p> */}
//     </div>
//   );
// };

// // const ImageGallery: React.FC<{ setImages: (images: (File | null)[]) => void; }> = ({ setImages }) => {
// //   const [images, setImageGallery] = useState<(File | null)[]>(Array(10).fill(null));
// //   const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

// //   useEffect(() => {
// //     setImages(images);
// //   }, [images, setImages]);

// //   const handleUpload = (index: number, file: File) => {
// //     const newImages = [...images];
// //     newImages[index] = file;
// //     setImageGallery(newImages);

// //     if (mainImageIndex === null) {
// //       setMainImageIndex(index);
// //     }
// //   };

// //   const handleCloseImage = (index: number) => {
// //     const newImages = [...images];
// //     newImages[index] = null;
// //     setImageGallery(newImages);

// //     if (index === mainImageIndex) {
// //       setMainImageIndex(null);
// //     }
// //   };

// //   const handleSetMain = (index: number) => {
// //     setMainImageIndex(index);
// //   };

// //   return (
// //     <div className="mx-auto">
// //       <div className="grid grid-cols-5 gap-4 mb-4 w-[650px]">
// //         {images.map((image, index) => (
// //           <ImageCard
// //             key={index}
// //             file={image}
// //             index={index}
// //             onUpload={handleUpload}
// //             onClose={handleCloseImage}
// //             isMain={index === mainImageIndex}
// //             onSetMain={handleSetMain}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// export default ImageGallery;

// 'use client';

// import React, { useState, ChangeEvent, useEffect } from 'react';
// import Image from 'next/image';
// import { toast } from 'react-toastify';

// import IconPlus from '@assets/icons/IconPlus';
// import images from '@assets/images';

// interface ImageCardProps {
//   file: File | null;
//   index: number;
//   onUpload: (index: number, file: File) => void;
//   onClose: (index: number) => void;
//   isMain: boolean;
//   onSetMain: (index: number) => void;
// }

// const ImageCard: React.FC<ImageCardProps> = ({ file, index, onUpload, onClose, isMain, onSetMain }) => {
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = e => {
//         setImageUrl(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImageUrl(null);
//     }
//   }, [file]);

//   const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]; // Ambil hanya file pertama
//     if (file) {
//       const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//       const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

//       if (!allowedTypes.includes(file.type)) {
//         toast.error('Format file harus .png, .jpeg, atau .jpg');
//         return;
//       }

//       if (file.size > maxSizeInBytes) {
//         toast.error('Ukuran file maksimal 5MB');
//         return;
//       }

//       onUpload(index, file);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center rounded-lg shadow-md w-[125px] h-[125px] mr-2">
//       {imageUrl ? (
//         <Image
//           width={125}
//           height={125}
//           src={imageUrl}
//           alt="Gambar Ruangan"
//           className="w-[125px] h-[125px] object-fit"
//         />
//       ) : (
//         <label htmlFor={`fileInput-${index}`} className="cursor-pointer w-full h-full flex items-center justify-center"> {/* Label untuk input file */}
//           <div
//             className="border border-[#d5d5d5] rounded grid place-items-center w-full h-full items-center justify-left bg-[#f9f8ff]"
//             onKeyDown={() => { }}
//             role="button"
//             tabIndex={0}
//           >
//             <IconPlus width={52} height={52} color="#505050" />
//           </div>
//           <input
//             type="file"
//             id={`fileInput-${index}`}
//             accept="image/png, image/jpeg, image/jpg"
//             onChange={handleFileInputChange}
//             className="hidden"
//           />
//         </label>
//       )}

//       {/* Tombol untuk menjadikan gambar utama dan menghapus */}
//       <div className="absolute top-2 flex justify-between w-full px-2">
//         <button
//           type="button"
//           className={`bg-gray-200 px-2 py-1 rounded-md text-extra-small regular-12 border ${isMain ? 'border-[#4c1eff] text-[#4c1eff]' : 'border-gray-400 text-gray-600'
//             }`}
//           onClick={() => onSetMain(index)} // Panggil onSetMain saat diklik
//         >
//           {isMain ? 'Foto Utama' : 'Jadikan Utama'}
//         </button>
//         {file && ( // Hanya tampilkan tombol close jika ada file
//           <Image
//             src={images.ERASE_IMAGE}
//             width={12}
//             height={12}
//             alt="Delete Icon"
//             className="hover:cursor-pointer absolute top-2 right-2"
//             onClick={() => onClose(index)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// const ImageGallery: React.FC<{ setImages: (images: File[]) => void; }> = ({ setImages }) => {
//   const [images, setImageGallery] = useState<File[]>(Array(10).fill(null));
//   const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

//   useEffect(() => {
//     setImages(images);
//   }, [images]);

//   const handleUpload = (index: number, file: File) => {
//     const newImages = [...images];
//     newImages[index] = file;
//     setImageGallery(newImages);

//     if (mainImageIndex === null) {
//       setMainImageIndex(0);
//     }
//   };

//   const handleCloseImage = (index: number) => {
//     const newImages = [...images];
//     newImages[index] = null;
//     setImageGallery(newImages);

//     if (index === mainImageIndex) {
//       setMainImageIndex(null);
//     }
//   };

//   const handleSetMain = (index: number) => {
//     setMainImageIndex(index);
//   };

//   return (
//     <div className="mx-auto">
//       <div className="grid grid-cols-5 gap-4 mb-4 w-[650px]">
//         {images.map((image, index) => (
//           <ImageCard
//             key={index}
//             file={image}
//             index={index}
//             onUpload={handleUpload}
//             onClose={handleCloseImage}
//             isMain={index === mainImageIndex}
//             onSetMain={handleSetMain}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;

{
  /* <p className="mt-2 text-center w-[175px]">Format (.png / .jpeg / .jpg ) size max 5MB & ratio 2:1</p> */
}

// const handleCloseImage = (index: number) => {
//   const newImages = images.filter((_, i) => i !== index); // Hapus elemen pada indeks tertentu
//   setImageGallery(newImages);

//   if (index === mainImageIndex) {
//     setMainImageIndex(null);
//   }
// };

import React, { useState, ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'

import IconPlus from '@assets/icons/IconPlus'
import images from '@assets/images'

interface ImageCardProps {
  file: File
  isMain: boolean
  onClose?: () => void
}

const ImageCard: React.FC<ImageCardProps> = ({ file, isMain, onClose }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = e => {
      setImageUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [file])

  return (
    <div className="relative flex flex-col items-center justify-center rounded-lg shadow-md w-[125px] h-[125px] mr-2">
      {imageUrl && (
        <Image
          width={125}
          height={125}
          src={imageUrl}
          alt="Gambar Ruangan"
          className="w-[125px] h-[125px] object-cover"
        />
      )}
      {isMain && (
        <p className="absolute top-2 left-2 bg-gray-200 px-2 py-1 rounded-md text-extra-small regular-12 border border-[#4c1eff] text-[#4c1eff]">
          Foto Utama
        </p>
      )}

      <Image
        src={images.ERASE_IMAGE}
        width={12}
        height={12}
        alt="Delete Icon"
        className="hover:cursor-pointer absolute top-2 right-2"
        onClick={onClose}
      />
    </div>
  )
}

const ImageGallery: React.FC<{ setImages: (images: File[]) => void }> = ({ setImages }) => {
  const [images, setImageGallery] = useState<File[]>([])

  useEffect(() => {
    setImages(images)
  }, [images])

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)
        if (file) {
          const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
          const maxSizeInBytes = 5 * 1024 * 1024 // 5MB

          if (!allowedTypes.includes(file.type)) {
            toast.error('Format file harus .png, .jpeg, atau .jpg')
            return
          }

          if (file.size > maxSizeInBytes) {
            toast.error('Ukuran file maksimal 5MB')
            return
          }

          setImageGallery(prevImages => [...prevImages, file])
        }
      }
    }
  }

  const handleCloseImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImageGallery(newImages) // Use the renamed state variable
  }

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-5 gap-4 mb-4 w-[650px]">
        {images.slice(0, 10).map((image, index) => (
          <ImageCard key={index} file={image} isMain={index === 0} onClose={() => handleCloseImage(index)} />
        ))}
      </div>
      {images.length < 10 && (
        <div className="flex gap-2 items-center">
          <label htmlFor="fileInput" className="cursor-pointer">
            <div
              className="border border-[#d5d5d5] rounded grid place-items-center w-[125px] h-[125px] items-center justify-left bg-[#f9f8ff]"
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              <IconPlus width={52} height={52} color="#505050" />
            </div>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/png, image/jpeg, image/jpg"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />
          {/* <p className="mt-2 text-center w-[175px]">Format (.png / .jpeg / .jpg ) size max 5MB & ratio 2:1</p> */}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
