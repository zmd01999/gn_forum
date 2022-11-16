import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useArticleService } from "src/hooks";

const Actions = styled.div`
  ${tw`relative max-w-xs text-center mx-auto -mr-8 float-right`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-1/2 sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-20 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

export const SearchInp=()=>{
    const [value, setValue] = useState("");
    const articleService = useArticleService();

return (
    <Actions>
    <input type="text" placeholder="" value={value} onChange={(event)=>setValue(event.target.value)}/>
    <button onClick={
        async ()=>{
            articleService.searchArticle({page:1, title:value}).then(
                (res)=>{
                    console.log(res.data)
                }
            );
        }
    }>搜索</button>
  </Actions>
);
};

 