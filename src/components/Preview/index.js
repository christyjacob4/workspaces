import React from "react";
import ReactMarkdown from "react-markdown";

import CodeBlock from "../CodeBlock";

const Preview = props => {
//   const input = "# This is a header\n\nAnd this is a paragraph";
  let { code } = props;

  return (
    <div>
      <ReactMarkdown source={code} renderers={{ code: CodeBlock }} />
    </div>
  );
};

export default Preview;
