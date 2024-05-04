import { getRequest } from '@/hook/api'
import React from 'react'
import CategoryItems from './CategoryItems'

const Category = async () => {
    let data = await getRequest("/product/list-category")
    let search = data?.data.map((element: any) => ({
        name: element.name,
        href: "?category=" + element.code,
        code: element.code
    }))
    search = [{ name: "All", href: "?category=", code: "" }, ...search]
    return (
        <CategoryItems category={search}/>
    )
}

export default Category