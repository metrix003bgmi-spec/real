console.log(
    "PRODUCT PREVIEW JS LOADED",
    window.location.pathname,
    Date.now()
);




(function () {

    console.log("PRODUCT PREVIEW SYSTEM LOADED");


    let galleryImages = [];
    let currentIndex = 0;


    /*
     * =========================================
     * OPEN PRODUCT PREVIEW
     * =========================================
     */

    function openProductPreview(product) {

        console.log("OPENING PRODUCT PREVIEW");


        const overlay =
            document.getElementById(
                "productPreviewOverlay"
            );

        const previewImage =
            document.getElementById(
                "previewImage"
            );

        const thumbnails =
            document.getElementById(
                "previewThumbnails"
            );


        if (!overlay) {
            console.error(
                "productPreviewOverlay not found"
            );
            return;
        }


        if (!previewImage) {
            console.error(
                "previewImage not found"
            );
            return;
        }


        if (!thumbnails) {
            console.error(
                "previewThumbnails not found"
            );
            return;
        }


        /*
         * -----------------------------------------
         * FIND ALL PRODUCTS IN THIS GALLERY
         * -----------------------------------------
         */

        const galleryName =
            product.dataset.gallery;


        const allProducts =
            document.querySelectorAll(
                ".js-product-preview"
            );


        galleryImages = [];


        allProducts.forEach(
            function (item) {

                /*
                 * Only collect products belonging
                 * to the same gallery.
                 */

                if (
                    item.dataset.gallery !==
                    galleryName
                ) {
                    return;
                }


                const image =
                    item.querySelector("img");


                if (!image) {
                    return;
                }


                galleryImages.push({

                    src:
                        image.currentSrc ||
                        image.src,

                    alt:
                        image.alt || ""

                });

            }
        );


        console.log(
            "GALLERY IMAGES:",
            galleryImages
        );


        if (!galleryImages.length) {

            console.error(
                "No gallery images found"
            );

            return;

        }


        /*
         * -----------------------------------------
         * FIND WHICH IMAGE WAS CLICKED
         * -----------------------------------------
         */

        const clickedImage =
            product.querySelector("img");


        const clickedSrc =
            clickedImage.currentSrc ||
            clickedImage.src;


        currentIndex =
            galleryImages.findIndex(
                function (image) {

                    return (
                        image.src ===
                        clickedSrc
                    );

                }
            );


        if (currentIndex === -1) {
            currentIndex = 0;
        }


        /*
         * -----------------------------------------
         * DISPLAY GALLERY
         * -----------------------------------------
         */

        renderGallery();


        /*
         * -----------------------------------------
         * SHOW OVERLAY
         * -----------------------------------------
         */

        overlay.classList.add(
            "is-visible"
        );


        document.body.style.overflow =
            "hidden";


        console.log(
            "PREVIEW OPENED"
        );

    }


    /*
     * =========================================
     * RENDER MAIN IMAGE + THUMBNAILS
     * =========================================
     */

    function renderGallery() {

        const previewImage =
            document.getElementById(
                "previewImage"
            );


        const thumbnails =
            document.getElementById(
                "previewThumbnails"
            );


        if (
            !previewImage ||
            !thumbnails ||
            !galleryImages.length
        ) {
            return;
        }


        /*
         * -----------------------------------------
         * MAIN IMAGE
         * -----------------------------------------
         */

        const currentImage =
            galleryImages[currentIndex];


        previewImage.src =
            currentImage.src;


        previewImage.alt =
            currentImage.alt;


        /*
         * -----------------------------------------
         * CLEAR OLD THUMBNAILS
         * -----------------------------------------
         */

        thumbnails.innerHTML = "";


        /*
         * -----------------------------------------
         * CREATE THUMBNAILS
         * -----------------------------------------
         */

        galleryImages.forEach(
            function (image, index) {

                const thumbnailButton =
                    document.createElement(
                        "button"
                    );


                thumbnailButton.type =
                    "button";


                thumbnailButton.className =
                    "preview-thumb";


                thumbnailButton.dataset.index =
                    index;


                if (
                    index === currentIndex
                ) {

                    thumbnailButton.classList.add(
                        "active"
                    );

                }


                const thumbnailImage =
                    document.createElement(
                        "img"
                    );


                thumbnailImage.src =
                    image.src;


                thumbnailImage.alt =
                    image.alt;

                
                console.log(
  "THUMBNAILS BEFORE:",
  previewThumbnails.children.length
);


                thumbnailButton.appendChild(
                    thumbnailImage
                );


                thumbnails.appendChild(
                    thumbnailButton
                );

            }
        );

    }


    /*
     * =========================================
     * NEXT IMAGE
     * =========================================
     */

    function showNextImage() {

        if (!galleryImages.length) {
            return;
        }


        currentIndex =
            (
                currentIndex + 1
            ) %
            galleryImages.length;


        renderGallery();

    }


    /*
     * =========================================
     * PREVIOUS IMAGE
     * =========================================
     */

    function showPreviousImage() {

        if (!galleryImages.length) {
            return;
        }


        currentIndex =
            (
                currentIndex -
                1 +
                galleryImages.length
            ) %
            galleryImages.length;


        renderGallery();

    }


    /*
     * =========================================
     * CLOSE PREVIEW
     * =========================================
     */

    function closeProductPreview() {

        const overlay =
            document.getElementById(
                "productPreviewOverlay"
            );


        if (!overlay) {
            return;
        }


        overlay.classList.remove(
            "is-visible"
        );


        document.body.style.overflow =
            "";

    }


    /*
     * =========================================
     * GLOBAL CLICK LISTENER
     *
     * This is the important part for your
     * page-transition website.
     * =========================================
     */

    document.addEventListener(
        "click",
        function (event) {


            /*
             * -------------------------------------
             * PRODUCT CLICK
             * -------------------------------------
             */

            const product =
                event.target.closest(
                    ".js-product-preview"
                );


            if (product) {

                console.log(
                    "PRODUCT PREVIEW CLICKED"
                );


                event.preventDefault();


                openProductPreview(
                    product
                );


                return;

            }


            /*
             * -------------------------------------
             * THUMBNAIL CLICK
             * -------------------------------------
             */

            const thumbnail =
                event.target.closest(
                    ".preview-thumb"
                );


            if (thumbnail) {

                const index =
                    Number(
                        thumbnail.dataset.index
                    );


                if (
                    !Number.isNaN(index)
                ) {

                    currentIndex =
                        index;


                    renderGallery();

                }


                return;

            }


            /*
             * -------------------------------------
             * NEXT BUTTON
             * -------------------------------------
             */

            const nextButton =
                event.target.closest(
                    "#previewNext"
                );


            if (nextButton) {

                event.preventDefault();

                showNextImage();

                return;

            }


            /*
             * -------------------------------------
             * PREVIOUS BUTTON
             * -------------------------------------
             */

            const previousButton =
                event.target.closest(
                    "#previewPrev"
                );


            if (previousButton) {

                event.preventDefault();

                showPreviousImage();

                return;

            }


            /*
             * -------------------------------------
             * CLOSE BUTTON
             * -------------------------------------
             */

            const closeButton =
                event.target.closest(
                    "#previewClose"
                );


            if (closeButton) {

                event.preventDefault();

                closeProductPreview();

                return;

            }


            /*
             * -------------------------------------
             * CLICK BACKGROUND TO CLOSE
             * -------------------------------------
             */

            const overlay =
                event.target.closest(
                    "#productPreviewOverlay"
                );


            if (
                overlay &&
                event.target === overlay
            ) {

                closeProductPreview();

            }

        }
    );


    /*
     * =========================================
     * KEYBOARD CONTROLS
     * =========================================
     */

    document.addEventListener(
        "keydown",
        function (event) {

            const overlay =
                document.getElementById(
                    "productPreviewOverlay"
                );


            if (!overlay) {
                return;
            }


            if (
                !overlay.classList.contains(
                    "is-visible"
                )
            ) {
                return;
            }


            /*
             * ESCAPE
             */

            if (
                event.key === "Escape"
            ) {

                closeProductPreview();

                return;

            }


            /*
             * RIGHT ARROW
             */

            if (
                event.key === "ArrowRight"
            ) {

                showNextImage();

                return;

            }


            /*
             * LEFT ARROW
             */

            if (
                event.key === "ArrowLeft"
            ) {

                showPreviousImage();

                return;

            }

        }
    );


})();









// console.log(
//     "PREVIEW JS:",
//     window.location.href
// );


// document.addEventListener(
//     "click",
//     function (event) {

//         const product =
//             event.target.closest(
//                 ".js-product-preview"
//             );


//         if (product) {

//             console.log(
//                 "DELEGATED CLICK WORKS"
//             );

//         }

//     }
// );





// document.addEventListener("DOMContentLoaded", function () {

//     const overlay =
//         document.getElementById("productPreviewOverlay");

//     const previewImage =
//         document.getElementById("previewImage");

//     const thumbnails =
//         document.getElementById("previewThumbnails");

//     const closeButton =
//         document.getElementById("previewClose");

//     const previousButton =
//         document.getElementById("previewPrev");

//     const nextButton =
//         document.getElementById("previewNext");


//     const products =
//         document.querySelectorAll(
//             ".js-product-preview"
//         );


//     let galleryImages = [];

//     let currentIndex = 0;


//     products.forEach(function (product) {

//         product.addEventListener(
//             "click",
//             function (event) {

//                 event.preventDefault();

//                 event.stopImmediatePropagation();


//                 const galleryName =
//                     product.dataset.gallery;


//                 galleryImages = [];


//                 products.forEach(function (item) {

//                     if (
//                         item.dataset.gallery !==
//                         galleryName
//                     ) {
//                         return;
//                     }


//                     const image =
//                         item.querySelector("img");


//                     if (!image) {
//                         return;
//                     }


//                     galleryImages.push({

//                         src:
//                             image.currentSrc ||
//                             image.src,

//                         alt:
//                             image.alt || ""

//                     });

//                 });


//                 const clickedImage =
//                     product.querySelector("img");


//                 const clickedSrc =
//                     clickedImage.currentSrc ||
//                     clickedImage.src;


//                 currentIndex =
//                     galleryImages.findIndex(
//                         function (image) {

//                             return (
//                                 image.src ===
//                                 clickedSrc
//                             );

//                         }
//                     );


//                 if (currentIndex < 0) {
//                     currentIndex = 0;
//                 }


//                 renderGallery();


//                 overlay.classList.add(
//                     "is-visible"
//                 );


//                 document.body.style.overflow =
//                     "hidden";

//             },
//             true
//         );

//     });


//     function renderGallery() {

//         if (!galleryImages.length) {
//             return;
//         }


//         const current =
//             galleryImages[currentIndex];


//         previewImage.src =
//             current.src;

//         previewImage.alt =
//             current.alt;


//         thumbnails.innerHTML = "";


//         galleryImages.forEach(
//             function (image, index) {

//                 const button =
//                     document.createElement(
//                         "button"
//                     );


//                 button.type = "button";

//                 button.className =
//                     "preview-thumb";


//                 if (
//                     index === currentIndex
//                 ) {

//                     button.classList.add(
//                         "active"
//                     );

//                 }


//                 const thumbnail =
//                     document.createElement(
//                         "img"
//                     );


//                 thumbnail.src =
//                     image.src;

//                 thumbnail.alt =
//                     image.alt;


//                 button.appendChild(
//                     thumbnail
//                 );


//                 button.addEventListener(
//                     "click",
//                     function () {

//                         currentIndex =
//                             index;

//                         renderGallery();

//                     }
//                 );


//                 thumbnails.appendChild(
//                     button
//                 );

//             }
//         );

//     }


//     nextButton.addEventListener(
//         "click",
//         function (event) {

//             event.preventDefault();

//             event.stopPropagation();


//             if (!galleryImages.length) {
//                 return;
//             }


//             currentIndex =
//                 (
//                     currentIndex + 1
//                 ) %
//                 galleryImages.length;


//             renderGallery();

//         }
//     );


//     previousButton.addEventListener(
//         "click",
//         function (event) {

//             event.preventDefault();

//             event.stopPropagation();


//             if (!galleryImages.length) {
//                 return;
//             }


//             currentIndex =
//                 (
//                     currentIndex -
//                     1 +
//                     galleryImages.length
//                 ) %
//                 galleryImages.length;


//             renderGallery();

//         }
//     );


//     closeButton.addEventListener(
//         "click",
//         function () {

//             overlay.classList.remove(
//                 "is-visible"
//             );

//             document.body.style.overflow =
//                 "";

//         }
//     );


//     overlay.addEventListener(
//         "click",
//         function (event) {

//             if (
//                 event.target === overlay
//             ) {

//                 closeButton.click();

//             }

//         }
//     );


//     document.addEventListener(
//         "keydown",
//         function (event) {

//             if (
//                 !overlay.classList.contains(
//                     "is-visible"
//                 )
//             ) {
//                 return;
//             }


//             if (event.key === "Escape") {

//                 closeButton.click();

//             }


//             if (event.key === "ArrowRight") {

//                 nextButton.click();

//             }


//             if (event.key === "ArrowLeft") {

//                 previousButton.click();

//             }

//         }
//     );

// });