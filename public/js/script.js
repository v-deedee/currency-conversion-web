function autoFill() {
    $("#code-1").attr("value", $("#currency-1 option:selected").val());
    $("#country-1").attr("value", $("#currency-1 option:selected").attr("class"));
    $("#code-2").attr("value", $("#currency-2 option:selected").val());
    $("#country-2").attr("value", $("#currency-2 option:selected").attr("class"));
}

$(document).ready(function() {
    autoFill();
    $(document).on('change', 'select', autoFill);
});