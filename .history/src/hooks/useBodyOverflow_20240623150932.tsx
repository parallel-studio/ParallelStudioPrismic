const useBodyOverflow = (isModalOpen: boolean) => {
    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);
};
