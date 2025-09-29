const About = () => {
    return (
        <div className="pt-[15vh] bg-secondary">
            <section id="a-propos" className="pt-25">
                <div className="ml-16 pb-[15vh] text-primary">
                    <h2 className="text-xl md:text-2xl">A Propos</h2>
                    <p className="font-sans text-lg md:text-xl">Text</p>
                </div>

                {/* Grilles */}
                <div className="px-8 md:px-16 space-y-6 pb-16">
                    {/* PremiÃ¨re ligne - 2 grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-0">
                        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 min-h-[400px]">
                            <h3 className="text-primary text-xl font-bold mb-3">Grid 1</h3>
                            <p className="text-primary/70">Text</p>
                        </div>
                        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 min-h-[400px]">
                            <h3 className="text-primary text-xl font-bold mb-3">Grid 2</h3>
                            <p className="text-primary/70">Text</p>
                        </div>
                    </div>

                    {/* DeuxiÃ¨me ligne - 1 grande Ã  gauche, 2 empilÃ©es Ã  droite */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-0">
                        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 md:row-span-2 min-h-[400px] md:min-h-[800px] gap-y-6 md:gap-y-0">
                            <h3 className="text-primary text-xl font-bold mb-3">Grid 3</h3>
                            <p className="text-primary/70">Text</p>
                        </div>
                        <div className="flex flex-col gap-y-6">
                            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 min-h-[400px]">
                                <h3 className="text-primary text-xl font-bold mb-3">Grid 4</h3>
                                <p className="text-primary/70">Text</p>
                            </div>
                            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 min-h-[400px]">
                                <h3 className="text-primary text-xl font-bold mb-3">Grid 5</h3>
                                <p className="text-primary/70">Text</p>
                            </div>
                        </div>
                    </div>

                    {/* TroisiÃ¨me ligne - 1 grid pleine largeur */}
                    <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 min-h-[400px]">
                        <h3 className="text-primary text-xl font-bold mb-3">Grid 6</h3>
                        <p className="text-primary/70">Text</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;