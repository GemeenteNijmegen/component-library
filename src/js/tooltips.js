import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const hideOnEsc = {
    name: 'hideOnEsc',
    defaultValue: true,
    fn: ({ hide }) => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                hide();
            }
        };

        return {
            onShow() {
                document.addEventListener('keydown', handleKeyDown);
            },
            onHide() {
                document.removeEventListener('keydown', handleKeyDown);
            },
        };
    },
};

const config = {
    arrow: true,
    plugins: [hideOnEsc],
    interactive: true,
    aria: {
        content: 'describedby',
        expanded: false,
    },
    appendTo: document.body,
    onCreate: instance => {
        const $reference = $(instance.reference);

        const content = $reference.attr('title');
        instance.setContent(content);
        $reference.removeAttr('title');

        const placement = $reference.attr('data-placement');
        if (placement) {
            instance.setProps({ placement });
        }
    },
    onMount: instance => {
        $(instance.popper).attr('aria-hidden', 'true');
    },
};

tippy('[data-toggle="tooltip"]', { ...config });
tippy('[data-tippy]', { ...config });
