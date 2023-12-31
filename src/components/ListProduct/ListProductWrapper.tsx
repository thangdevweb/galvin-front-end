'use client';
import { useState } from 'react';
import FilterWrapper from './FilterWrapper';
import ListProduct from './ListProduct';
import { FilterProps } from '~/types';
interface Props {
  type: number;
  searchParams: { [key: string]: string };
  sizes: [];
  colors: [];
}
function ListProductWrapper({ type, searchParams, sizes, colors }: Props) {
  const [filter, setFilter] = useState<FilterProps>({
    sizeList: [],
    colorID: '',
  });

  return (
    <div className="flex mb-10 flex-col lg:flex-row">
      <FilterWrapper filter={filter} sizes={sizes} colors={colors} setFilter={setFilter} />
      <ListProduct searchParams={searchParams} categoryID={type} filter={filter} />
    </div>
  );
}

export default ListProductWrapper;
