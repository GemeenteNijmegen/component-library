function areInputsValid(currentInputs, targetId, validateAllRequiredFields) {
    var isValid = true;
    for (var i = 0; i < currentInputs.length; i++) {
        $(currentInputs[i]).addClass('valid');
        if (!currentInputs[i].validity.valid) {
            isValid = false;

            // Only show a required input is invalid for the current input or when validating all required
            if (validateAllRequiredFields || currentInputs[i].id === targetId) {
                $(currentInputs[i]).addClass('invalid');
            }
        }
    }
    return isValid;
}

function updateBackButtons(navigationStep, mobileBackBtn) {
    if (navigationStep.find('.backBtn').length > 0) {
        // Check if step has back button
        mobileBackBtn.show();
    } else {
        mobileBackBtn.hide();
    }
}

function isValidStep(stepNumber, validSteps) {
    return $.inArray(stepNumber, validSteps) > -1;
}

function setNavigationItemStatuses(navigationListItems, navigationStep, currentStepNumber, stepCount, validSteps) {
    navigationStep
        .prevAll()
        .removeClass('disabled')
        .addClass('completed')
        .removeClass('active');
    $('.step-status', navigationStep.prevAll()).text('Voltooide stap');
    navigationStep
        .removeClass('disabled')
        .removeClass('completed')
        .addClass('active');
    $('.step-status', navigationStep).text('Actieve stap');
    var currentStepIsValid = isValidStep(currentStepNumber, validSteps);
    if (!currentStepIsValid) {
        navigationStep
            .nextAll()
            .addClass('disabled')
            .removeClass('active')
            .removeClass('completed');
        $('.step-status', navigationStep.nextAll()).text('');
        return;
    }

    navigationStep.nextAll().removeClass('active');
    var previousStepValid = true;
    for (var i = currentStepNumber + 1; i <= stepCount; i++) {
        if (isValidStep(i, validSteps) && previousStepValid) {
            navigationListItems
                .eq(i - 1)
                .parent()
                .removeClass('disabled')
                .addClass('completed');
            $('.step-status', navigationListItems.eq(i - 1).parent()).text('Voltooide stap');
        } else if (previousStepValid) {
            navigationListItems
                .eq(i - 1)
                .parent()
                .removeClass('disabled')
                .removeClass('completed');
            $('.step-status', navigationListItems.eq(i - 1).parent()).text('');
        } else {
            navigationListItems
                .eq(i - 1)
                .parent()
                .addClass('disabled')
                .removeClass('completed');
            $('.step-status', navigationListItems.eq(i - 1).parent()).text('');
        }
        previousStepValid = isValidStep(i, validSteps) && previousStepValid;
    }
    navigationStep.next().removeClass('disabled');
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
    mobileNextBtn.show();
    if (navigationStep.find('.nextBtn').length > 0) {
        // Check if step has a next button
        updateBackButtons(navigationStep, mobileBackBtn);
    } else {
        mobileNextBtn.hide();
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
$(document).ready(function() {
    var navigationListItems = $('.stepper-steps > li > a'),
        allContent = $('.step-content'),
        allBackBtn = $('.backBtn'),
        allNextBtn = $('.nextBtn'),
        mobileBackBtn = $('.back-link'),
        mobileNextBtn = $('.next-link'),
        activeStep = $('.stepper-steps > li.active > a'),
        stepperForm = $('#stepper-form'),
        stepperFormInputs = $('#stepper-form :input'),
        validSteps = [];

    allContent.hide();

    stepperFormInputs.on('change keyup paste', function(event) {
        var currentStepContent = $(this).closest('.step-content'),
            currentStep = $('.stepper-steps > li > a[href="#' + currentStepContent.attr('id') + '"]').parent(),
            currentStepNumber = parseInt(currentStepContent.attr('id').substring(13)),
            currentInputs = currentStepContent.find('input');

        currentStep.removeClass('disabled');
        var stepPositionInArray = $.inArray(currentStepNumber, validSteps);
        var stepIsValid = isValidStep(currentStepNumber, validSteps);
        if (areInputsValid(currentInputs, event.target.id, false)) {
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

    navigationListItems.click(function(event) {
        event.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            if (
                $item
                    .parent()
                    .prev()
                    .find('button[type="submit"]').length
            ) {
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
                parseInt($item.attr('href').substring(14)),
                allContent.length,
                validSteps
            );
        }
    });

    mobileBackBtn.add(allBackBtn).click(function() {
        var currentStepContent = $('.stepper-steps > li.active').children('.step-content'),
            previousStep = $('.stepper-steps > li > a[href="#' + currentStepContent.attr('id') + '"]')
                .parent()
                .prev()
                .children('a');
        previousStep.trigger('click');
    });

    mobileNextBtn.add(allNextBtn).click(function() {
        var currentStepContent = $('.stepper-steps > li.active').children('.step-content'),
            nextStep = $('.stepper-steps > li > a[href="#' + currentStepContent.attr('id') + '"]')
                .parent()
                .next()
                .children('a'),
            currentInputs = currentStepContent.find('input');

        if (areInputsValid(currentInputs, null, true)) {
            nextStep.trigger('click');
        }
    });

    activeStep.trigger('click');
});
