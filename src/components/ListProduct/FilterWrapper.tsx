'use client';
import { useEffect, useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { productAPI } from '~/api/productAPI';
import { FilterProps } from '~/types';

interface Props {
  setFilter: (filter: any) => void;
}
function FilterWrapper({ setFilter }: Props) {
  const [isOpen, setIsOpen] = useState({
    size: false,
    color: false,
  });
  const [sizeList, setSizeList] = useState<any>([]);
  const [colorList, setColorList] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const sizeRes = await productAPI.getAllSize();
      const colorRes = await productAPI.getAllColor();
      setSizeList(sizeRes.data.data);
      setColorList(colorRes.data.data);
    };
    fetchData();
  }, []);
  const handleChecked = (type: string, value: number | string) => {
    setFilter((pre: FilterProps) => {
      const updated: FilterProps = { ...pre };
      let index;
      if (type === 'size') {
        index = updated.sizeList.indexOf(value as number);
        index === -1 ? updated.sizeList.push(value as number) : updated.sizeList.splice(index, 1);
      } else {
        updated.colorID = value;
      }
      return updated;
    });
  };
  return (
    <div className="basis-3/12 font-mono">
      <div className="mb-5">
        <h3
          onClick={() => setIsOpen((pre) => ({ ...pre, size: !pre.size }))}
          className="text-2xl flex justify-between items-center font-medium cursor-pointer py-2 border-b border-[#eee]"
        >
          KÍCH THƯỚC
          <span className="text-lg">{isOpen.size ? <IoChevronUp /> : <IoChevronDown />}</span>
        </h3>
        {isOpen.size ? (
          <ul className="mt-3">
            {sizeList.map((item: any) => (
              <li className="flex items-center gap-2 mb-2" key={item.id}>
                <input
                  className="appearance-none w-5 h-5 border border-[#dbdbdb] checked:after:block after:content-['\2714'] after:text-sm after:hidden after:text-center after:leading-4"
                  type="checkbox"
                  onClick={() => handleChecked('size', item.id)}
                />
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-5">
        <h3
          onClick={() => setIsOpen((pre) => ({ ...pre, color: !pre.color }))}
          className="text-2xl flex justify-between items-center font-medium cursor-pointer py-2 border-b border-[#eee]"
        >
          MÀU SẮC
          <span className="text-lg">{isOpen.color ? <IoChevronUp /> : <IoChevronDown />}</span>
        </h3>
        {isOpen.color ? (
          <ul className="mt-3">
            <li className="flex items-center gap-2 mb-2">
              <input
                className="appearance-none w-5 h-5 border border-[#dbdbdb] checked:after:block after:content-['\2714'] after:text-sm after:hidden after:text-center after:leading-4"
                type="radio"
                name="color"
                onClick={() => handleChecked('color', '')}
              />
              <span>Tất cả</span>
            </li>
            {colorList.map((item: any) => (
              <li className="flex items-center gap-2 mb-2" key={item.id}>
                <input
                  className="appearance-none w-5 h-5 border border-[#dbdbdb] checked:after:block after:content-['\2714'] after:text-sm after:hidden after:text-center after:leading-4"
                  type="radio"
                  name="color"
                  onClick={() => handleChecked('color', item.id)}
                />
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default FilterWrapper;
