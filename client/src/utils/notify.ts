import * as bootstrap from 'bootstrap';

function notify(title: string, subtitle: string, msg: string) {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="toast" style="z-index: 9999;" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">${title}</strong>
            <small>${subtitle}</small>
            <button type="button" class="btn-close toast-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${msg}
        </div>
    </div>`;
    document.getElementById("notification")!.appendChild(template.content);
    // $('.toast').toast('show');
    document.querySelectorAll('.toast').forEach(function (toastNode) {
        var toast = new bootstrap.Toast(toastNode);
        toast.show();
    });
}

// Close notification when hidden or auto hide
document.addEventListener("hide.bs.toast", function (event) {
    if (!(event.target instanceof Element) || !event.target.matches(".toast")) return;

    function removeNotification(toast: any) {
        toast.remove();
    }

    setTimeout(removeNotification, 100, event.target);
});

export default notify;