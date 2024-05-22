function submitBlog() {
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const imageFile = document.getElementById('blog-image').files[0];

    const blogPost = document.createElement('div');
    blogPost.classList.add('blog-post');

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    const contentElement = document.createElement('p');
    contentElement.textContent = content;

    blogPost.appendChild(titleElement);
    blogPost.appendChild(contentElement);

    if (imageFile) {
        const imageElement = document.createElement('img');
        imageElement.classList.add('blog-post-image');

        const reader = new FileReader();
        reader.onload = function(event) {
            imageElement.src = event.target.result;
        };
        reader.readAsDataURL(imageFile);

        blogPost.appendChild(imageElement);
    }

    const blogPostsSection = document.getElementById('blog-posts');
    blogPostsSection.appendChild(blogPost);

    document.getElementById('blog-title').value = '';
    document.getElementById('blog-content').value = '';
    document.getElementById('blog-image').value = ''; 

    const createBlogForm = document.getElementById('create-blog-form');
    createBlogForm.classList.add('hidden');
}
const fileInput = document.getElementById('blog-image');

const maxSizeInBytes = 1024 * 1024; // 1MB

const desiredWidth = 300;
const desiredHeight = 300;

fileInput.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function(event) {
            const img = new Image();

            img.src = event.target.result;

            img.onload = function() {
                if (this.width !== desiredWidth || this.height !== desiredHeight) {
                    fileInput.value = null;
                    alert(`Please select an image with dimensions ${desiredWidth}x${desiredHeight}.`);
                }
            };
        };

        if (file.size > maxSizeInBytes) {
            this.value = null;
            alert('Please select a file smaller than 1MB.');
        }
    }
});
