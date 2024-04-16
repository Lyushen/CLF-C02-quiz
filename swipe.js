function initializeSwipeHandling() {
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;
    let sens_percent_value = 0.2; // 20% of the screen
    let sensitivity = visualViewport.width * sens_percent_value; // Use % of the visual viewport width

    // Update sensitivity on resize or zoom
    visualViewport.addEventListener('resize', () => {
        sensitivity = visualViewport.width * sens_percent_value;
    });

    const onPointerDown = (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) {
            return;
        }

        // Check if the event target is within #question-text area
        if (event.target.closest('#question-text')) {
            return; // Exit and do not track swipe if inside #question-text
        }

        event.target.setPointerCapture(event.pointerId);

        touchStartX = event.clientX;
        touchStartY = event.clientY;
        isSwiping = false;  // Reset swipe state on new gesture start

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
    };


    const onPointerMove = (event) => {
        if (!isSwiping) {
            const touchEndX = event.clientX;
            const deltaX = touchEndX - touchStartX;

            if (Math.abs(deltaX) > sensitivity) {
                isSwiping = true;
                event.preventDefault();

                if (deltaX > 0) {
                    updateQuestionDisplay(currentIndex + 1); // Swipe left
                } else {
                    updateQuestionDisplay(currentIndex - 1); // Swipe right
                }
            }
        }
    };

    const onPointerUp = (event) => {
        event.target.releasePointerCapture(event.pointerId);
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        isSwiping = false;
    };

    document.addEventListener('pointerdown', onPointerDown);
}

document.addEventListener('DOMContentLoaded', initializeSwipeHandling);
