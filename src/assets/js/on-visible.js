export function onVisible(
    targets,
    {
        onElemVisible = () => {},
        onElemHidden = () => {},
        options = {
            rootMargin: '0px',
            threshold: 0
        },
    }
){
    const observer = new IntersectionObserver(
        handle(onElemVisible, onElemHidden), 
        options
    )

    for (const target of targets){
        observer.observe(target)
    }
}

function handle(onElemVisible, onElemHidden) {
    return (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                onElemVisible(entry.target)
                continue
            }

            onElemHidden(entry.target)
        }
    }  
}