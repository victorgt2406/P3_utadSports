import { Lang } from "../langs/langs";

type Content = {
    lang: Lang;
    content: string;
    title: string;
    image?: string;
}

export default Content;