$(document).ready(function(){

    var btn_Generate = $('#btn-generate');
    var btn_sum = $('#btn-sum');
    var btn_sub = $('#btn-sub');
    var btn_clear = $('#btn-clear');
    var dynamic_Fields = $('#dynamic-fields');
    var btn_Calculate = $('#btn-calculate');
    // var div_Result = $('#div-result');
    var operation = $('#operation');
    var numberFields = 0;
    var fields = [];

    function replicateFields(value){
        dynamic_Fields.empty();
        for(let i = 0; i < value; i++){
            if(i % 5 == 0){
                var newDiv = document.createElement('div');
                $(newDiv).prop('id', "div-" + i);
            }
            var newField = document.createElement('input');
            $(newField).prop('required', true);
            $(newField).prop('id', "field-" + i);
            $(newField).addClass("field");
            $(newField).prop('name', i);
        

            newDiv.appendChild(newField);
            
            // var operator = operation.children("option:selected").val();
            // if(i != value - 1){
            //     newDiv.append(operator);
            // }
            dynamic_Fields.append(newDiv);
        }

        operation.prop('hidden', false);
        btn_Calculate.prop('hidden', false);
    }

    $('#operation').on('change', function(){
        replicateFields(numberFields);
    })

    function validateFields(){
        fields = [];
        var validation = true; 
        $(".field").each(function(){
            var value = parseFloat($(this).val());
            if(!$.isNumeric(value)){
                alert("Valores inválidos!");
                validation = false;
                return false;
            }
            fields.push(value);
        })

        return validation;
    }

    btn_sum.click(function(){
        var result = 0;
        if(validateFields()){
            fields.forEach(function(value, index){
                if(index == 0)
                    result = value;
                else
                    result += value;
            })
            showResult(result);
        }
    })

    btn_sub.click(function(){
        var result = 0;
        if(validateFields()){
            fields.forEach(function(value, index){
                if(index == 0)
                    result = value; 
                else
                    result -= value;
            })
            showResult(result);
        }
    })

    btn_clear.click(function(){
        $(document.getElementById('div-fields')).css({"visibility": "hidden"});
        $(document.getElementById('div-result')).css({"visibility": "hidden"});
    })

    btn_Generate.click(function(){
        numberFields = document.getElementById('input-numberFields').value;
        if(!$.isNumeric(numberFields) || numberFields < 2){
            alert("O número de campos deve ser um valor numérico, inteiro, e igual ou maior que 2!");
        }
        else{
            $(document.getElementById('div-fields')).css({"visibility":"visible"});
            replicateFields(numberFields);
        }
    });

    function showResult(result){
        $(document.getElementById('div-result')).css({"visibility": "visible"});
        $(document.getElementById('input-result')).val(result);
    }
});