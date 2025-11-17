function showMessage(id) {
        document.querySelectorAll('.hidden-message').forEach(msg => msg.style.display = 'none');

            document.getElementById(id).style.display = 'block';
        }