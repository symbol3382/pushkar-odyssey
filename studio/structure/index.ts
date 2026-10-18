import type { StructureResolver } from "sanity/structure";

const singleton =
  (id: string, title: string, schemaType: string) =>
  (S: Parameters<StructureResolver>[0]) =>
    S.listItem()
      .title(title)
      .id(id)
      .child(S.document().schemaType(schemaType).documentId(id).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site")
        .child(
          S.list()
            .title("Site")
            .items([
              singleton("siteSettings", "Site settings", "siteSettings")(S),
              singleton("homePage", "Home page", "homePage")(S),
              singleton("historyPage", "History", "historyPage")(S),
            ]),
        ),
      S.listItem()
        .title("Offerings")
        .child(
          S.list()
            .title("Offerings")
            .items([
              S.documentTypeListItem("pooja").title("Poojas"),
              S.documentTypeListItem("travelPackage").title("Travel packages"),
              S.documentTypeListItem("stay").title("Stays"),
              S.documentTypeListItem("experience").title(
                "Guides, riding, and services",
              ),
            ]),
        ),
      S.listItem()
        .title("Places")
        .child(
          S.list()
            .title("Places")
            .items([
              S.documentTypeListItem("destination").title("Destinations"),
            ]),
        ),
      S.listItem()
        .title("Stories")
        .child(
          S.list()
            .title("Stories")
            .items([
              S.documentTypeListItem("workItem").title("Works gallery"),
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("faq").title("FAQs"),
              S.documentTypeListItem("page").title("Pages"),
            ]),
        ),
    ]);

const SINGLETONS = new Set(["siteSettings", "homePage", "historyPage"]);

export function filterNewDocumentOptions(
  items: { templateId: string }[],
  context: { creationContext: { type: string } },
) {
  if (context.creationContext.type === "global") {
    return items.filter((item) => !SINGLETONS.has(item.templateId));
  }
  return items;
}

export function filterDocumentActions<T extends { action?: string }>(
  actions: T[],
  schemaType: string,
): T[] {
  if (!SINGLETONS.has(schemaType)) return actions;
  return actions.filter(
    (action) => action.action !== "duplicate" && action.action !== "delete",
  );
}
