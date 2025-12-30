import Image from "next/image";

const projects = [
    {
        title: "HUEMUL",
        image: "/img/huemul.jpg",
    },
    {
        title: "ALERCE",
        image: "/img/alerces.jpg",
    },
    {
        title: "DIDYMO",
        image: "/img/agua.jpg",
    },
];

export default function ProjectsGrid() {
    return (
        <section className="py-12 px-6 bg-background">
            <h3 className="text-center text-primary text-lg font-semibold mb-8">
                PROYECTOS DE CONSERVACIÓN
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {projects.map((project) => (
                    <div
                        key={project.title}
                        className="rounded-2xl border-2 border-primary p-4 flex flex-col items-center bg-white"
                    >
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <p className="mt-4 text-primary font-semibold text-sm tracking-wide">
                            {project.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
