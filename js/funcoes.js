$(document).ready(function(){

    var btn_Generate = $('#btn-generate');
    var dynamic_Fields = $('#dynamic-fields');
    var btn_Calculate = $('#btn-calculate');
    // var div_Result = $('#div-result');
    var operation = $('#operation');
    var numberFields = 0;

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
            
            var operator = operation.children("option:selected").val();
            if(i != value - 1){
                newDiv.append(operator);
            }
            dynamic_Fields.append(newDiv);
        }

        operation.prop('hidden', false);
        btn_Calculate.prop('hidden', false);
    }

    $('#operation').on('change', function(){
        replicateFields(numberFields);
    })

    btn_Generate.click(function(){
        $(document.getElementById('div-fields')).css({"visibility":"visible"});
        numberFields = document.getElementById('input-numberFields').value;
        if(!$.isNumeric(numberFields) || numberFields <= 0){
            alert("The value must be a positive number!");
        }
        else{
            replicateFields(numberFields);
        }
    });
    
    function operate(result, value){
        if(result != null){
            switch(operation.children("option:selected").val()){
                case "+":
                    return result + value;
                case "-":
                    return result - value;
                case "*":
                    return result * value;
                case "/":
                    return result / value;
            }
        }
        else{
            return value;
        }
    }

    btn_Calculate.click(function(){
        var result = null;
        var valid = true;
        $(".field").each(function(){
            var value = parseFloat($(this).val());
            if(!$.isNumeric(value)){
                alert("The values must be numbers!");
                valid = false;
                return false;
            }
            result = operate(result, value);
        });

        if(valid == true){
            showResult(result);
        }

        
    });

    function showResult(result){
        $(document.getElementById('div-result')).css({"visibility": "visible"});
        $(document.getElementById('input-result')).val(result);
    }
});