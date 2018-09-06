## Stepper

Based on the version from MDB:<br />
{{ mdbootstrapPath 'components/bootstrap-steps-stepper/' }}

And, Google's Material design:<br />
https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps

### Using

The stepper is designed to work with up to six steps and should appear only once per page.

The stepper is linear, allowing only forward progression once each step is valid.

The step labels and form input can be changed freely to suit your needs.

The stepper uses a horizontal view on large width screen, vertical view on medium width screens and mobile view on small width screens.

As shown (commented out) within step 5 of the example, a submit button could be used at any point and will get triggered on step progression:
```html
<button class="btn disabled btn-primary nextBtn float-right" type="submit">Submit</button>
```
The submit button will post the form inputs, and could appear on any step.

The below JavaScript is required to use the Stepper component and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use' }}).

```javascript
<script>
    function areInputsValid(currentInputs) {
        var isValid = true;
        $(".form-group").removeClass("has-error");
        for (var i = 0; i< currentInputs.length; i++) {
            if (!currentInputs[i].validity.valid){
                isValid = false;
                $(currentInputs[i]).closest(".form-group").addClass("has-error");
            }
        }
        return isValid;
    }

    function updateStepStatus(previousStep, newStep, mobileNextBtn, currentStep, stepCount) {
        previousStep.addClass('disabled').addClass('completed').removeClass('active').attr('aria-label', 'completed step');
        newStep.addClass('active').attr('aria-label', 'active step');
        if (parseInt(currentStep) === parseInt(stepCount)) {
            mobileNextBtn.remove();
        } else {
            mobileNextBtn.addClass('disabled').attr('aria-label', 'disabled');
        }
        $('.current-step').text(currentStep);
        $('.step-count').text(stepCount);
    }

    // Stepper Form
    $(document).ready(function () {
        var navListItems = $('.stepper-steps li a'),
                allContent = $('.step-content'),
                allNextBtn = $('.nextBtn'),
                mobileNextBtn = $('.next-link'),
                activeStep = $('.stepper-steps li.active a'),
                stepperForm = $('#stepper-form');
                stepperFormInputs = $('#stepper-form :input');

        allContent.hide();

        stepperFormInputs.change(function() {
            var currentStepContent = $(this).closest(".step-content"),
                    currentStep = $('.stepper-steps li a[href="#' + currentStepContent.attr("id") + '"]').parent(),
                    nextStep = currentStep.next(),
                    currentInputs = currentStepContent.find("input");

            currentStep.removeClass('disabled');
            if (areInputsValid(currentInputs)) {
                // If valid enable next step, disable current step
                currentStepContent.find('.nextBtn').removeClass('disabled');
                nextStep.removeClass('disabled');
                mobileNextBtn.removeClass('disabled').attr('aria-label', 'Next');
            } else {
                nextStep.addClass('disabled');
                mobileNextBtn.addClass('disabled').attr('aria-label', 'disabled');
                currentStepContent.find('.nextBtn').addClass('disabled');
            }
        });

        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                    $item = $(this);

            if (!$item.hasClass('disabled')) {
                if ($item.parent().prev().find('button[type="submit"]').length) {
                    stepperForm.submit();
                }
                allContent.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
                updateStepStatus(
                    $item.parent().prev(),
                    $item.parent(),
                    mobileNextBtn,
                    $item.attr("href").substring(14),
                    allContent.length
                );
            }
        });

        mobileNextBtn.add(allNextBtn).click(function(){
            var currentStepContent = $('.stepper-steps li.active').children('.step-content'),
                    nextStep = $('.stepper-steps li a[href="#' + currentStepContent.attr("id") + '"]').parent().next().children("a"),
                    currentInputs = currentStepContent.find("input");

            if (areInputsValid(currentInputs)) {
                nextStep.trigger('click');
            }
        });

        activeStep.trigger('click');

        $(window).keydown(function(event){
            if((event.keyCode == 13) && !$(event.target).is('.next-link, .nextBtn')) {
                event.preventDefault();
                return false;
            }
        });
    });
</script>
```

