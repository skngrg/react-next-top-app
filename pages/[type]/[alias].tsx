import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from 'axios';
import { MenuItem } from "../../interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";
import { withLayout } from "../../layout/Layout";
import { firstLeveMenu } from "../../helpers/helpers";
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {

    return (
        <TopPageComponent firstCategory={firstCategory} page={page} products={products} />
    );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for(const m of firstLeveMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: m.id
        });
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
    }

    return {
      paths,
      fallback: true
  }
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if(!params) {
        return {
            notFound: true
        };
    }
    const firstCategoryItem = firstLeveMenu.find(m => m.route === params.type);
    if(!firstCategoryItem) {
        return {
            notFound: true
        };
    }
    try {
        const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: firstCategoryItem.id
        });
        if (menu.length === 0) {
            return {
                notFound: true
            };
        }
        const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
            category: page.category,
            limit: 10
        });
        return {
            props: {
                firstCategory: firstCategoryItem.id,
                page,
                menu,
                products
            }
        };
    } catch {
        return {
            notFound: true
        };
    }
};

interface TopPageProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[]
}
