## Stepper

Based on the version from MDB:<br />
{{ mdbootstrapPath 'components/bootstrap-steps-stepper/' }}

And, Google's Material design:<br />
https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps

### Using

The stepper is designed to work with up to six steps and should appear only once per page.

The stepper allows both forward and backward progression once each step is valid.

Back buttons should only be included on the steps that need it. For instance, not step 1.

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

    function enableBackButtons(navigationStep, mobileBackBtn, allBackBtn) {
        mobileBackBtn.removeClass('disabled').attr('aria-label', 'Back').show();
        allBackBtn.removeClass('disabled');
        navigationStep.prevAll().removeClass('disabled');
    }

    function disableBackButtons(navigationStep, mobileBackBtn, allBackBtn) {
        mobileBackBtn.addClass('disabled').attr('aria-label', 'disabled').hide();
        allBackBtn.addClass('disabled');
        navigationStep.prevAll().addClass('disabled');
    }

    function updateBackButtons(navigationStep, mobileBackBtn, allBackBtn) {
        if (navigationStep.find('.backBtn').length > 0) { // Check if step has back button
            enableBackButtons(navigationStep, mobileBackBtn, allBackBtn);
        } else {
            disableBackButtons(navigationStep, mobileBackBtn, allBackBtn);
        }
    }

    function enableStepNextButtons(mobileNextBtn, allNextBtn) {
        mobileNextBtn.removeClass('disabled').attr('aria-label', 'Next').show();
        allNextBtn.removeClass('disabled');
    }

    function disableStepNextButtons(mobileNextBtn, allNextBtn) {
        mobileNextBtn.addClass('disabled').attr('aria-label', 'disabled').show();
        allNextBtn.addClass('disabled');
    }

    function isValidStep(stepNumber, validSteps) {
        if ($.inArray(stepNumber, validSteps) > -1) {
            return true;
        }
        return false;
    }

    function setNavigationItemStatuses(navigationListItems, navigationStep, currentStepNumber, stepCount, validSteps) {
        navigationStep.prevAll().removeClass('disabled').addClass('completed').removeClass('active').attr('aria-label', 'completed step');
        navigationStep.removeClass('disabled').removeClass('completed').addClass('active').attr('aria-label', 'active step');
        var currentStepIsValid = isValidStep(currentStepNumber, validSteps);
        if (!currentStepIsValid) {
            navigationStep.nextAll().addClass('disabled').removeClass('active').removeClass('completed').removeAttr('aria-label');
            return;
        }

        navigationStep.nextAll().removeClass('active');
        var previousStepValid = true;
        for (var i = currentStepNumber + 1; i <= stepCount; i++) {
            if (isValidStep(i, validSteps) && previousStepValid) {
                navigationListItems.eq(i - 1).parent().removeClass('disabled').addClass('completed').attr('aria-label', 'completed step');
            } else if (previousStepValid) {
                navigationListItems.eq(i - 1).parent().removeClass('disabled').removeClass('completed').removeAttr('aria-label');
            } else {
                navigationListItems.eq(i - 1).parent().addClass('disabled').removeClass('completed').removeAttr('aria-label');
            }
            previousStepValid = isValidStep(i, validSteps) && previousStepValid;
        }
        navigationStep.next().removeClass('disabled');
    }

    function disableNavigationItems(navigationListItems) {
        navigationListItems.addClass('disabled');
    }

    function updateButtons(
        navigationListItems,
        navigationStep,
        allBackBtn,
        allNextBtn,
        mobileBackBtn,
        mobileNextBtn,
        currentStepNumber,
        stepCount,
        validSteps
    ) {
        setNavigationItemStatuses(navigationListItems, navigationStep, currentStepNumber, stepCount, validSteps);
        if (navigationStep.find('.nextBtn').length > 0) { // Check if step has a next button
            if (isValidStep(currentStepNumber, validSteps)) {
                enableStepNextButtons(mobileNextBtn, allNextBtn);
            } else {
                disableStepNextButtons(mobileNextBtn, allNextBtn);
            }
            updateBackButtons(navigationStep, mobileBackBtn, allBackBtn);
        } else {
            // disable all buttons
            disableStepNextButtons(mobileNextBtn, allNextBtn);
            disableNavigationItems(navigationListItems);
            disableBackButtons(navigationStep, mobileBackBtn, allBackBtn);
        }
    }

    function updateStepStatus(
        navigationListItems,
        navigationStep,
        allBackBtn,
        allNextBtn,
        mobileBackBtn,
        mobileNextBtn,
        currentStepNumber,
        stepCount,
        validSteps
    ) {
        updateButtons(
            navigationListItems,
            navigationStep,
            allBackBtn,
            allNextBtn,
            mobileBackBtn,
            mobileNextBtn,
            currentStepNumber,
            stepCount,
            validSteps
        );
        $('.current-step').text(currentStepNumber);
        $('.step-count').text(stepCount);
    }

    // Stepper Form
    $(document).ready(function () {
        var navigationListItems = $('.stepper-steps li a'),
                allContent = $('.step-content'),
                allBackBtn = $('.backBtn'),
                allNextBtn = $('.nextBtn'),
                mobileBackBtn = $('.back-link'),
                mobileNextBtn = $('.next-link'),
                activeStep = $('.stepper-steps li.active a'),
                stepperForm = $('#stepper-form'),
                stepperFormInputs = $('#stepper-form :input'),
                validSteps = [];

        allContent.hide();

        stepperFormInputs.change(function() {
            var currentStepContent = $(this).closest(".step-content"),
                    currentStep = $('.stepper-steps li a[href="#' + currentStepContent.attr("id") + '"]').parent(),
                    currentStepNumber = parseInt(currentStepContent.attr("id").substring(13)),
                    currentInputs = currentStepContent.find("input");

            currentStep.removeClass('disabled');
            var stepPositionInArray = $.inArray(currentStepNumber, validSteps);
            var stepIsValid = isValidStep(currentStepNumber, validSteps);
            if (areInputsValid(currentInputs)) {
                if (!stepIsValid) validSteps.push(currentStepNumber);
            } else {
                if (stepIsValid) validSteps.splice(stepPositionInArray, 1);
            }
            updateStepStatus(
                navigationListItems,
                currentStep,
                allBackBtn,
                allNextBtn,
                mobileBackBtn,
                mobileNextBtn,
                currentStepNumber,
                allContent.length,
                validSteps
            );
        });

        navigationListItems.click(function (e) {
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
                    navigationListItems,
                    $item.parent(),
                    allBackBtn,
                    allNextBtn,
                    mobileBackBtn,
                    mobileNextBtn,
                    parseInt($item.attr("href").substring(14)),
                    allContent.length,
                    validSteps
                );
            }
        });

        mobileBackBtn.add(allBackBtn).click(function(){
            var currentStepContent = $('.stepper-steps li.active').children('.step-content'),
                    previousStep = $('.stepper-steps li a[href="#' + currentStepContent.attr("id") + '"]').parent().prev().children("a");
            previousStep.trigger('click');
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
            if((event.keyCode == 13) && !$(event.target).is(
                '.back-link, .backBtn, .next-link, .nextBtn, .step-link'
            )) {
                event.preventDefault();
                return false;
            }
        });
    });
</script>
```

