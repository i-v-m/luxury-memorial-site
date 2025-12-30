export default function CatalogHeader() {
  return (
    <section className="pt-4 pb-4 px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Каталог памятников
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Более 45 готовых моделей памятников из премиальных материалов. 
            Возможность индивидуального изготовления по вашему проекту.
          </p>
        </div>
      </div>
    </section>
  );
}