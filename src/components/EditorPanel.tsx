import { Hash, Bold, Italic, Strikethrough, Link2, List, ListOrdered, CheckSquare, Code, Smile, Code2, Minus, Image } from "lucide-react";

export const EditorPanel = () => {
  return (
    <div className="editor-panel">
      <div className="editor-header">
        <h1 className="text-xl font-semibold mb-4">Create a new PouchDB adapter for op-sqlite</h1>
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" className="checkbox" />
          <select className="editor-select">
            <option>Awesome SaaS : Mobile app</option>
          </select>
          <select className="editor-select">
            <option>Status</option>
          </select>
          <span className="editor-tag">React Native</span>
          <span className="editor-tag accent">Database</span>
          <button className="text-sm text-muted-foreground hover:text-foreground">Add Tags</button>
        </div>
        <div className="editor-toolbar">
          <Hash className="w-4 h-4" />
          <Bold className="w-4 h-4" />
          <Italic className="w-4 h-4" />
          <Strikethrough className="w-4 h-4" />
          <Link2 className="w-4 h-4" />
          <List className="w-4 h-4" />
          <ListOrdered className="w-4 h-4" />
          <CheckSquare className="w-4 h-4" />
          <Code className="w-4 h-4" />
          <Smile className="w-4 h-4" />
          <Code2 className="w-4 h-4" />
          <Minus className="w-4 h-4" />
          <Image className="w-4 h-4" />
        </div>
      </div>
      <div className="editor-content">
        <div className="code-block">
          <div className="code-line">
            <span className="line-number">80</span>
          </div>
          <div className="code-line">
            <span className="line-number">81</span>
            <span className="code-comment">### Migration</span>
          </div>
          <div className="code-line">
            <span className="line-number">82</span>
          </div>
          <div className="code-line">
            <span className="line-number">83</span>
            <span className="code-text">Specify the absolute path</span>
          </div>
          <div className="code-line">
            <span className="line-number">84</span>
          </div>
          <div className="code-line">
            <span className="line-number">85</span>
            <span className="code-text">- [</span>
            <span className="code-string">op-sqlite Configuration</span>
            <span className="code-text">](</span>
            <span className="code-link">https://ospfranco.notion.site/Configuration</span>
          </div>
          <div className="code-line">
            <span className="line-number">86</span>
            <span className="code-text">  -6b8b9564afcc4ac6b6b377fe34475090#38a5b477bbc543f2ae3c75d5b5365226)</span>
          </div>
          <div className="code-line">
            <span className="line-number">87</span>
          </div>
          <div className="code-line">
            <span className="line-number">88</span>
            <span className="code-comment">```typescript</span>
          </div>
          <div className="code-line">
            <span className="line-number">89</span>
            <span className="code-keyword">import</span>
            <span className="code-text"> {`{`}</span>
          </div>
          <div className="code-line">
            <span className="line-number">90</span>
            <span className="code-text">  </span>
            <span className="code-variable">IOS_LIBRARY_PATH</span>
            <span className="code-text">, </span>
            <span className="code-comment">// Default iOS</span>
          </div>
          <div className="code-line">
            <span className="line-number">91</span>
            <span className="code-text">  </span>
            <span className="code-variable">IOS_DOCUMENT_PATH</span>
            <span className="code-text">,</span>
          </div>
          <div className="code-line">
            <span className="line-number">92</span>
            <span className="code-text">  </span>
            <span className="code-variable">ANDROID_DATABASE_PATH</span>
            <span className="code-text">, </span>
            <span className="code-comment">// Default Android</span>
          </div>
          <div className="code-line">
            <span className="line-number">93</span>
            <span className="code-text">  </span>
            <span className="code-variable">ANDROID_FILES_PATH</span>
            <span className="code-text">,</span>
          </div>
          <div className="code-line">
            <span className="line-number">94</span>
            <span className="code-text">  </span>
            <span className="code-variable">ANDROID_EXTERNAL_FILES_PATH</span>
            <span className="code-text">, </span>
            <span className="code-comment">// Android SD Card</span>
          </div>
          <div className="code-line">
            <span className="line-number">95</span>
            <span className="code-text">  </span>
            <span className="code-function">open</span>
            <span className="code-text">,</span>
          </div>
          <div className="code-line">
            <span className="line-number">96</span>
            <span className="code-text">{`}`} </span>
            <span className="code-keyword">from</span>
            <span className="code-text"> </span>
            <span className="code-string">'@op-engineering/op-sqlite'</span>
            <span className="code-text">;</span>
          </div>
          <div className="code-line">
            <span className="line-number">97</span>
          </div>
          <div className="code-line">
            <span className="line-number">98</span>
            <span className="code-keyword">const</span>
            <span className="code-text"> db = </span>
            <span className="code-function">open</span>
            <span className="code-text">({`{`}</span>
          </div>
          <div className="code-line">
            <span className="line-number">99</span>
            <span className="code-text">  name: </span>
            <span className="code-string">'myDb'</span>
            <span className="code-text">,</span>
          </div>
          <div className="code-line">
            <span className="line-number">100</span>
            <span className="code-text">  location: Platform.OS === </span>
            <span className="code-string">'ios'</span>
            <span className="code-text"> ? </span>
            <span className="code-variable">IOS_LIBRARY_PATH</span>
            <span className="code-text"> :</span>
          </div>
          <div className="code-line">
            <span className="line-number">101</span>
            <span className="code-text">    </span>
            <span className="code-variable">ANDROID_DATABASE_PATH</span>
            <span className="code-text">,</span>
          </div>
          <div className="code-line">
            <span className="line-number">102</span>
            <span className="code-text">{`}`});</span>
          </div>
        </div>
      </div>
    </div>
  );
};
