// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Content for Category documents
 */
interface CategoryDocumentData {
    /**
     * Title field in *Category*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: category.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    title: prismic.KeyTextField;
}

/**
 * Category document from Prismic
 *
 * - **API ID**: `category`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CategoryDocument<Lang extends string = string> =
    prismic.PrismicDocumentWithUID<
        Simplify<CategoryDocumentData>,
        "category",
        Lang
    >;

/**
 * Item in *Navigation → Links*
 */
export interface NavigationDocumentDataLinksItem {
    /**
     * Label field in *Navigation → Links*
     *
     * - **Field Type**: Title
     * - **Placeholder**: Optional - Label for the link
     * - **API ID Path**: navigation.links[].label
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    label: prismic.TitleField;

    /**
     * Link field in *Navigation → Links*
     *
     * - **Field Type**: Link
     * - **Placeholder**: Link for navigation item
     * - **API ID Path**: navigation.links[].link
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    link: prismic.LinkField;
}

/**
 * Content for Navigation documents
 */
interface NavigationDocumentData {
    /**
     * Links field in *Navigation*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: navigation.links[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#group
     */
    links: prismic.GroupField<Simplify<NavigationDocumentDataLinksItem>>;
}

/**
 * Navigation document from Prismic
 *
 * - **API ID**: `navigation`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavigationDocument<Lang extends string = string> =
    prismic.PrismicDocumentWithoutUID<
        Simplify<NavigationDocumentData>,
        "navigation",
        Lang
    >;

type PageDocumentDataSlicesSlice =
    | MegaHeroSlice
    | HeroSlice
    | QuoteSlice
    | TextSlice
    | ImageSlice
    | ImageCardsSlice
    | TextWithImageSlice;

/**
 * Content for Page documents
 */
interface PageDocumentData {
    /**
     * Title field in *Page*
     *
     * - **Field Type**: Title
     * - **Placeholder**: *None*
     * - **API ID Path**: page.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    title: prismic.TitleField;

    /**
     * Parent field in *Page*
     *
     * - **Field Type**: Content Relationship
     * - **Placeholder**: *None*
     * - **API ID Path**: page.parent
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    parent: prismic.ContentRelationshipField<"page">;

    /**
     * Slice Zone field in *Page*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: page.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#slices
     */
    slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
     * Meta Title field in *Page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: A title of the page used for social media and search engines
     * - **API ID Path**: page.meta_title
     * - **Tab**: SEO & Metadata
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */;
    meta_title: prismic.KeyTextField;

    /**
     * Meta Description field in *Page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: A brief summary of the page
     * - **API ID Path**: page.meta_description
     * - **Tab**: SEO & Metadata
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    meta_description: prismic.KeyTextField;

    /**
     * Meta Image field in *Page*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: page.meta_image
     * - **Tab**: SEO & Metadata
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> =
    prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Item in *Project → Categories*
 */
export interface ProjectDocumentDataCategoriesItem {
    /**
     * Category field in *Project → Categories*
     *
     * - **Field Type**: Content Relationship
     * - **Placeholder**: *None*
     * - **API ID Path**: project.categories[].category
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    category: prismic.ContentRelationshipField<"category">;
}

/**
 * Item in *Project → Credits*
 */
export interface ProjectDocumentDataCreditsItem {
    /**
     * Title field in *Project → Credits*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.credits[].title
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    title: prismic.KeyTextField;

    /**
     * Name field in *Project → Credits*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.credits[].name
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    name: prismic.KeyTextField;
}

type ProjectDocumentDataSlicesSlice = TextSlice | ImageSlice;

/**
 * Content for Project documents
 */
interface ProjectDocumentData {
    /**
     * Title field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    title: prismic.KeyTextField;

    /**
     * Subtitle field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.subtitle
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    subtitle: prismic.KeyTextField;

    /**
     * Description field in *Project*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.description
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    description: prismic.RichTextField;

    /**
     * Color field in *Project*
     *
     * - **Field Type**: Color
     * - **Placeholder**: *None*
     * - **API ID Path**: project.color
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#color
     */
    color: prismic.ColorField;

    /**
     * Categories field in *Project*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: project.categories[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#group
     */
    categories: prismic.GroupField<Simplify<ProjectDocumentDataCategoriesItem>>;

    /**
     * Credits field in *Project*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: project.credits[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#group
     */
    credits: prismic.GroupField<Simplify<ProjectDocumentDataCreditsItem>>;

    /**
     * Video field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.video
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    video: prismic.KeyTextField;

    /**
     * Slice Zone field in *Project*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: project.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#slices
     */
    slices: prismic.SliceZone<ProjectDocumentDataSlicesSlice> /**
     * Meta Title field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: A title of the page used for social media and search engines
     * - **API ID Path**: project.meta_title
     * - **Tab**: SEO & Metadata
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */;
    meta_title: prismic.KeyTextField;

    /**
     * Meta Description field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: A brief summary of the page
     * - **API ID Path**: project.meta_description
     * - **Tab**: SEO & Metadata
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    meta_description: prismic.KeyTextField;

    /**
     * Meta Image field in *Project*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: project.meta_image
     * - **Tab**: SEO & Metadata
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    meta_image: prismic.ImageField<never>;
}

/**
 * Project document from Prismic
 *
 * - **API ID**: `project`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProjectDocument<Lang extends string = string> =
    prismic.PrismicDocumentWithUID<
        Simplify<ProjectDocumentData>,
        "project",
        Lang
    >;

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
    /**
     * Site Title field in *Settings*
     *
     * - **Field Type**: Title
     * - **Placeholder**: Title of the site
     * - **API ID Path**: settings.siteTitle
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    siteTitle: prismic.TitleField;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> =
    prismic.PrismicDocumentWithoutUID<
        Simplify<SettingsDocumentData>,
        "settings",
        Lang
    >;

export type AllDocumentTypes =
    | CategoryDocument
    | NavigationDocument
    | PageDocument
    | ProjectDocument
    | SettingsDocument;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
    /**
     * Text field in *Hero → Default → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: hero.default.primary.text
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    text: prismic.RichTextField;

    /**
     * Button Link field in *Hero → Default → Primary*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: hero.default.primary.buttonLink
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    buttonLink: prismic.LinkField;

    /**
     * Button Text field in *Hero → Default → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: hero.default.primary.buttonText
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    buttonText: prismic.KeyTextField;

    /**
     * Background Image field in *Hero → Default → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: hero.default.primary.backgroundImage
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    backgroundImage: prismic.ImageField<never>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
    "default",
    Simplify<HeroSliceDefaultPrimary>,
    never
>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault;

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Item in *Image → Columns → Primary → Images*
 */
export interface ImageSliceColumnsPrimaryImagesItem {
    /**
     * Image field in *Image → Columns → Primary → Images*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: image.columns.primary.images[].image
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    image: prismic.ImageField<never>;
}

/**
 * Primary content in *Image → Default → Primary*
 */
export interface ImageSliceDefaultPrimary {
    /**
     * Image field in *Image → Default → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: image.default.primary.image
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    image: prismic.ImageField<never>;
}

/**
 * Default variation for Image Slice
 *
 * - **API ID**: `default`
 * - **Description**: Image
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageSliceDefault = prismic.SharedSliceVariation<
    "default",
    Simplify<ImageSliceDefaultPrimary>,
    never
>;

/**
 * Primary content in *Image → Banner → Primary*
 */
export interface ImageSliceBannerPrimary {
    /**
     * Image field in *Image → Banner → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: image.banner.primary.image
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    image: prismic.ImageField<never>;
}

/**
 * Banner variation for Image Slice
 *
 * - **API ID**: `banner`
 * - **Description**: Image
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageSliceBanner = prismic.SharedSliceVariation<
    "banner",
    Simplify<ImageSliceBannerPrimary>,
    never
>;

/**
 * Primary content in *Image → Columns → Primary*
 */
export interface ImageSliceColumnsPrimary {
    /**
     * Images field in *Image → Columns → Primary*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: image.columns.primary.images[]
     * - **Documentation**: https://prismic.io/docs/field#group
     */
    images: prismic.GroupField<Simplify<ImageSliceColumnsPrimaryImagesItem>>;
}

/**
 * Columns variation for Image Slice
 *
 * - **API ID**: `columns`
 * - **Description**: Image
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageSliceColumns = prismic.SharedSliceVariation<
    "columns",
    Simplify<ImageSliceColumnsPrimary>,
    never
>;

/**
 * Slice variation for *Image*
 */
type ImageSliceVariation =
    | ImageSliceDefault
    | ImageSliceBanner
    | ImageSliceColumns;

/**
 * Image Shared Slice
 *
 * - **API ID**: `image`
 * - **Description**: Image
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageSlice = prismic.SharedSlice<"image", ImageSliceVariation>;

/**
 * Item in *ImageCards → Default → Primary → Cards*
 */
export interface ImageCardsSliceDefaultPrimaryCardsItem {
    /**
     * Image field in *ImageCards → Default → Primary → Cards*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: image_cards.default.primary.cards[].image
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    image: prismic.ImageField<never>;

    /**
     * Text field in *ImageCards → Default → Primary → Cards*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: image_cards.default.primary.cards[].text
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    text: prismic.RichTextField;

    /**
     * Button Link field in *ImageCards → Default → Primary → Cards*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: image_cards.default.primary.cards[].buttonLink
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    buttonLink: prismic.LinkField;

    /**
     * Button Text field in *ImageCards → Default → Primary → Cards*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: image_cards.default.primary.cards[].buttonText
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    buttonText: prismic.KeyTextField;
}

/**
 * Primary content in *ImageCards → Default → Primary*
 */
export interface ImageCardsSliceDefaultPrimary {
    /**
     * Heading field in *ImageCards → Default → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: image_cards.default.primary.heading
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    heading: prismic.RichTextField;

    /**
     * Cards field in *ImageCards → Default → Primary*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: image_cards.default.primary.cards[]
     * - **Documentation**: https://prismic.io/docs/field#group
     */
    cards: prismic.GroupField<Simplify<ImageCardsSliceDefaultPrimaryCardsItem>>;
}

/**
 * Default variation for ImageCards Slice
 *
 * - **API ID**: `default`
 * - **Description**: ImageCards
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageCardsSliceDefault = prismic.SharedSliceVariation<
    "default",
    Simplify<ImageCardsSliceDefaultPrimary>,
    never
>;

/**
 * Slice variation for *ImageCards*
 */
type ImageCardsSliceVariation = ImageCardsSliceDefault;

/**
 * ImageCards Shared Slice
 *
 * - **API ID**: `image_cards`
 * - **Description**: ImageCards
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageCardsSlice = prismic.SharedSlice<
    "image_cards",
    ImageCardsSliceVariation
>;

/**
 * Item in *MegaHero → Default → Primary → Items*
 */
export interface MegaHeroSliceDefaultPrimaryItemsItem {
    data: string;
    /**
     * Project field in *MegaHero → Default → Primary → Items*
     *
     * - **Field Type**: Content Relationship
     * - **Placeholder**: *None*
     * - **API ID Path**: mega_hero.default.primary.items[].project
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    project: prismic.ContentRelationshipField<"project">;

    /**
     * Image field in *MegaHero → Default → Primary → Items*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: mega_hero.default.primary.items[].image
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    image: prismic.ImageField<never>;

    /**
     * Video field in *MegaHero → Default → Primary → Items*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: mega_hero.default.primary.items[].video
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    video: prismic.LinkToMediaField;

    /**
     * Display field in *MegaHero → Default → Primary → Items*
     *
     * - **Field Type**: Select
     * - **Placeholder**: *None*
     * - **Default Value**: horizontal
     * - **API ID Path**: mega_hero.default.primary.items[].display
     * - **Documentation**: https://prismic.io/docs/field#select
     */
    display: prismic.SelectField<"horizontal" | "vertical", "filled">;
}

/**
 * Primary content in *MegaHero → Default → Primary*
 */
export interface MegaHeroSliceDefaultPrimary {
    /**
     * Slogan field in *MegaHero → Default → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: mega_hero.default.primary.slogan
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    slogan: prismic.RichTextField;

    /**
     * Items field in *MegaHero → Default → Primary*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: mega_hero.default.primary.items[]
     * - **Documentation**: https://prismic.io/docs/field#group
     */
    items: prismic.GroupField<Simplify<MegaHeroSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for MegaHero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MegaHeroSliceDefault = prismic.SharedSliceVariation<
    "default",
    Simplify<MegaHeroSliceDefaultPrimary>,
    never
>;

/**
 * Slice variation for *MegaHero*
 */
type MegaHeroSliceVariation = MegaHeroSliceDefault;

/**
 * MegaHero Shared Slice
 *
 * - **API ID**: `mega_hero`
 * - **Description**: MegaHero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MegaHeroSlice = prismic.SharedSlice<
    "mega_hero",
    MegaHeroSliceVariation
>;

/**
 * Item in *ProjectDescription → Default → Primary → Categories*
 */
export interface ProjectDescriptionSliceDefaultPrimaryCategoriesItem {
    /**
     * Category field in *ProjectDescription → Default → Primary → Categories*
     *
     * - **Field Type**: Content Relationship
     * - **Placeholder**: *None*
     * - **API ID Path**: project_description.default.primary.categories[].category
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    category: prismic.ContentRelationshipField<"category">;
}

/**
 * Item in *ProjectDescription → Default → Primary → Table Lines*
 */
export interface ProjectDescriptionSliceDefaultPrimaryTableLinesItem {
    /**
     * title field in *ProjectDescription → Default → Primary → Table Lines*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project_description.default.primary.table_lines[].title
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    title: prismic.KeyTextField;

    /**
     * description field in *ProjectDescription → Default → Primary → Table Lines*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project_description.default.primary.table_lines[].description
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    description: prismic.KeyTextField;
}

/**
 * Primary content in *ProjectDescription → Default → Primary*
 */
export interface ProjectDescriptionSliceDefaultPrimary {
    /**
     * Title field in *ProjectDescription → Default → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project_description.default.primary.title
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    title: prismic.KeyTextField;

    /**
     * Subtitle field in *ProjectDescription → Default → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project_description.default.primary.subtitle
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    subtitle: prismic.KeyTextField;

    /**
     * Description field in *ProjectDescription → Default → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project_description.default.primary.description
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    description: prismic.RichTextField;

    /**
     * Categories field in *ProjectDescription → Default → Primary*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: project_description.default.primary.categories[]
     * - **Documentation**: https://prismic.io/docs/field#group
     */
    categories: prismic.GroupField<
        Simplify<ProjectDescriptionSliceDefaultPrimaryCategoriesItem>
    >;

    /**
     * Table Lines field in *ProjectDescription → Default → Primary*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: project_description.default.primary.table_lines[]
     * - **Documentation**: https://prismic.io/docs/field#group
     */
    table_lines: prismic.GroupField<
        Simplify<ProjectDescriptionSliceDefaultPrimaryTableLinesItem>
    >;
}

/**
 * Default variation for ProjectDescription Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProjectDescriptionSliceDefault = prismic.SharedSliceVariation<
    "default",
    Simplify<ProjectDescriptionSliceDefaultPrimary>,
    never
>;

/**
 * Slice variation for *ProjectDescription*
 */
type ProjectDescriptionSliceVariation = ProjectDescriptionSliceDefault;

/**
 * ProjectDescription Shared Slice
 *
 * - **API ID**: `project_description`
 * - **Description**: ProjectDescription
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProjectDescriptionSlice = prismic.SharedSlice<
    "project_description",
    ProjectDescriptionSliceVariation
>;

/**
 * Primary content in *Quote → Default → Primary*
 */
export interface QuoteSliceDefaultPrimary {
    /**
     * Quote field in *Quote → Default → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: quote.default.primary.quote
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    quote: prismic.RichTextField;

    /**
     * Source field in *Quote → Default → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: quote.default.primary.source
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    source: prismic.KeyTextField;
}

/**
 * Default variation for Quote Slice
 *
 * - **API ID**: `default`
 * - **Description**: Quote
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type QuoteSliceDefault = prismic.SharedSliceVariation<
    "default",
    Simplify<QuoteSliceDefaultPrimary>,
    never
>;

/**
 * Slice variation for *Quote*
 */
type QuoteSliceVariation = QuoteSliceDefault;

/**
 * Quote Shared Slice
 *
 * - **API ID**: `quote`
 * - **Description**: Quote
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type QuoteSlice = prismic.SharedSlice<"quote", QuoteSliceVariation>;

/**
 * Primary content in *Text → Default → Primary*
 */
export interface TextSliceDefaultPrimary {
    /**
     * Text field in *Text → Default → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text.default.primary.text
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    text: prismic.RichTextField;
}

/**
 * Default variation for Text Slice
 *
 * - **API ID**: `default`
 * - **Description**: Text
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextSliceDefault = prismic.SharedSliceVariation<
    "default",
    Simplify<TextSliceDefaultPrimary>,
    never
>;

/**
 * Primary content in *Text → Two Columns → Primary*
 */
export interface TextSliceTwoColumnsPrimary {
    /**
     * Text field in *Text → Two Columns → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text.twoColumns.primary.text
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    text: prismic.RichTextField;

    /**
     * Alignment field in *Text → Two Columns → Primary*
     *
     * - **Field Type**: Select
     * - **Placeholder**: *None*
     * - **Default Value**: Left
     * - **API ID Path**: text.twoColumns.primary.alignment
     * - **Documentation**: https://prismic.io/docs/field#select
     */
    alignment: prismic.SelectField<"Left" | "Center" | "Right", "filled">;
}

/**
 * Two Columns variation for Text Slice
 *
 * - **API ID**: `twoColumns`
 * - **Description**: Text
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextSliceTwoColumns = prismic.SharedSliceVariation<
    "twoColumns",
    Simplify<TextSliceTwoColumnsPrimary>,
    never
>;

/**
 * Slice variation for *Text*
 */
type TextSliceVariation = TextSliceDefault | TextSliceTwoColumns;

/**
 * Text Shared Slice
 *
 * - **API ID**: `text`
 * - **Description**: Text
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextSlice = prismic.SharedSlice<"text", TextSliceVariation>;

/**
 * Primary content in *TextWithImage → Default → Primary*
 */
export interface TextWithImageSliceDefaultPrimary {
    /**
     * Text field in *TextWithImage → Default → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_with_image.default.primary.text
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    text: prismic.RichTextField;

    /**
     * Image field in *TextWithImage → Default → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: text_with_image.default.primary.image
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    image: prismic.ImageField<never>;
}

/**
 * Default variation for TextWithImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: TextWithImage
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextWithImageSliceDefault = prismic.SharedSliceVariation<
    "default",
    Simplify<TextWithImageSliceDefaultPrimary>,
    never
>;

/**
 * Primary content in *TextWithImage → With Button → Primary*
 */
export interface TextWithImageSliceWithButtonPrimary {
    /**
     * Text field in *TextWithImage → With Button → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_with_image.withButton.primary.text
     * - **Documentation**: https://prismic.io/docs/field#rich-text-title
     */
    text: prismic.RichTextField;

    /**
     * Button Link field in *TextWithImage → With Button → Primary*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: text_with_image.withButton.primary.buttonLink
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    buttonLink: prismic.LinkField;

    /**
     * Button Text field in *TextWithImage → With Button → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_with_image.withButton.primary.buttonText
     * - **Documentation**: https://prismic.io/docs/field#key-text
     */
    buttonText: prismic.KeyTextField;

    /**
     * Image field in *TextWithImage → With Button → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: text_with_image.withButton.primary.image
     * - **Documentation**: https://prismic.io/docs/field#image
     */
    image: prismic.ImageField<never>;
}

/**
 * With Button variation for TextWithImage Slice
 *
 * - **API ID**: `withButton`
 * - **Description**: TextWithImage
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextWithImageSliceWithButton = prismic.SharedSliceVariation<
    "withButton",
    Simplify<TextWithImageSliceWithButtonPrimary>,
    never
>;

/**
 * Slice variation for *TextWithImage*
 */
type TextWithImageSliceVariation =
    | TextWithImageSliceDefault
    | TextWithImageSliceWithButton;

/**
 * TextWithImage Shared Slice
 *
 * - **API ID**: `text_with_image`
 * - **Description**: TextWithImage
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextWithImageSlice = prismic.SharedSlice<
    "text_with_image",
    TextWithImageSliceVariation
>;

/**
 * Primary content in *Video → Default → Primary*
 */
export interface VideoSliceDefaultPrimary {
    /**
     * Link field in *Video → Default → Primary*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: video.default.primary.link
     * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
     */
    link: prismic.LinkField;
}

/**
 * Default variation for Video Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type VideoSliceDefault = prismic.SharedSliceVariation<
    "default",
    Simplify<VideoSliceDefaultPrimary>,
    never
>;

/**
 * Slice variation for *Video*
 */
type VideoSliceVariation = VideoSliceDefault;

/**
 * Video Shared Slice
 *
 * - **API ID**: `video`
 * - **Description**: Video
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type VideoSlice = prismic.SharedSlice<"video", VideoSliceVariation>;

declare module "@prismicio/client" {
    interface CreateClient {
        (
            repositoryNameOrEndpoint: string,
            options?: prismic.ClientConfig
        ): prismic.Client<AllDocumentTypes>;
    }

    namespace Content {
        export type {
            CategoryDocument,
            CategoryDocumentData,
            NavigationDocument,
            NavigationDocumentData,
            NavigationDocumentDataLinksItem,
            PageDocument,
            PageDocumentData,
            PageDocumentDataSlicesSlice,
            ProjectDocument,
            ProjectDocumentData,
            ProjectDocumentDataCategoriesItem,
            ProjectDocumentDataCreditsItem,
            ProjectDocumentDataSlicesSlice,
            SettingsDocument,
            SettingsDocumentData,
            AllDocumentTypes,
            HeroSlice,
            HeroSliceDefaultPrimary,
            HeroSliceVariation,
            HeroSliceDefault,
            ImageSlice,
            ImageSliceDefaultPrimary,
            ImageSliceBannerPrimary,
            ImageSliceColumnsPrimaryImagesItem,
            ImageSliceColumnsPrimary,
            ImageSliceVariation,
            ImageSliceDefault,
            ImageSliceBanner,
            ImageSliceColumns,
            ImageCardsSlice,
            ImageCardsSliceDefaultPrimaryCardsItem,
            ImageCardsSliceDefaultPrimary,
            ImageCardsSliceVariation,
            ImageCardsSliceDefault,
            MegaHeroSlice,
            MegaHeroSliceDefaultPrimaryItemsItem,
            MegaHeroSliceDefaultPrimary,
            MegaHeroSliceVariation,
            MegaHeroSliceDefault,
            ProjectDescriptionSlice,
            ProjectDescriptionSliceDefaultPrimaryCategoriesItem,
            ProjectDescriptionSliceDefaultPrimaryTableLinesItem,
            ProjectDescriptionSliceDefaultPrimary,
            ProjectDescriptionSliceVariation,
            ProjectDescriptionSliceDefault,
            QuoteSlice,
            QuoteSliceDefaultPrimary,
            QuoteSliceVariation,
            QuoteSliceDefault,
            TextSlice,
            TextSliceDefaultPrimary,
            TextSliceTwoColumnsPrimary,
            TextSliceVariation,
            TextSliceDefault,
            TextSliceTwoColumns,
            TextWithImageSlice,
            TextWithImageSliceDefaultPrimary,
            TextWithImageSliceWithButtonPrimary,
            TextWithImageSliceVariation,
            TextWithImageSliceDefault,
            TextWithImageSliceWithButton,
            VideoSlice,
            VideoSliceDefaultPrimary,
            VideoSliceVariation,
            VideoSliceDefault,
        };
    }
}
