const newFormHandler = async (event) => {
event.preventDefault();

    const comment_body = document.querySelector('#comment-body').value.trim();
    const location = document.location.split('/');
    const blog_id = location[location.length - 1];

    if(comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment_body, blog_id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

    if (response.ok) {
      document.location.replace(`/posts/${blog_id}`);
    } else {
      alert('Failed to create post');
    }
  }
  else {
    alert('Need a body');
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

