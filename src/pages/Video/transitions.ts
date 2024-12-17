export const transitions = [
    {
        current: [
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(1.1)' }
        ],
        next: [
            { opacity: 0, transform: 'scale(0.9)' },
            { opacity: 1, transform: 'scale(1)' }
        ]
    },
    {
        current: [
            { opacity: 1, transform: 'translateX(0)' },
            { opacity: 0, transform: 'translateX(-100%)' }
        ],
        next: [
            { opacity: 0, transform: 'translateX(100%)' },
            { opacity: 1, transform: 'translateX(0)' }
        ]
    },
    {
        current: [
            { opacity: 1, transform: 'rotate(0deg)' },
            { opacity: 0, transform: 'rotate(-5deg)' }
        ],
        next: [
            { opacity: 0, transform: 'rotate(5deg)' },
            { opacity: 1, transform: 'rotate(0deg)' }
        ]
    }
];