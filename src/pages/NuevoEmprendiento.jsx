import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import FormNuevoEmpren from "../components/FormNuevoEmpren";

const NuevoEmprendimiento = () => {
    return (
        <div>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Title title="Información de nuevo emprendimiento" />
                <FormNuevoEmpren />
            </main>

        </div>
    );
};

export default NuevoEmprendimiento;