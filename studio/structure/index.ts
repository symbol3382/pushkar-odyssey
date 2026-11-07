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
        .title("Services")
        .child(
          S.list()
            .title("Services")
            .items([
              S.documentTypeListItem("serviceCategory").title(
                "Service categories",
              ),
              S.documentTypeListItem("service").title("Services"),
            ]),
        ),
      S.listItem()
        .title("Reference")
        .child(
          S.list()
            .title("Reference")
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
