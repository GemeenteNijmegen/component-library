toastr.options.closeHtml = '<button class="mdi mdi-window-close"><span class="sr-only">Sluiten</span></button>';
$('[data-toast-type]').click(function() {
    var toastrType = $(this).data('toast-type');
    var toastrText = $(this).data('toast-text');
    toastr[toastrType](toastrText, '', {
        closeButton: true,
        timeOut: 0,
        extendedTimeOut: 0,
    });
});

console.log(process.env.NODE_ENV);
