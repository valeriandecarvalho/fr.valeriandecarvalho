const SectionWrapper = ({ children, id, className }) => (
    <section
        id={id}
        className={className}>
        {children}
    </section>
);

export default SectionWrapper;