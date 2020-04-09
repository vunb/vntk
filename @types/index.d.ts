import CrfsuiteCore from "crfsuite";

declare namespace VNTK {
  interface Tokenizer {
    tokenize(text: string): string[];
    stokenize(text: string): string;
  }

  interface WordTokenizer {
    tag(text: string, mode?: "text"): string[] | string;
  }

  interface PosTag {
    tag(text: string, mode?: "text"): string[2][] | string;
  }

  interface Chunking {
    tag(text: string, mode?: "text"): string[3][] | string;
  }

  interface NamedEntityRecognition {
    tag(text: string, mode?: "text"): string[4][] | string;
  }

  namespace Utility {
    interface DictionarySense {
      example: string;
      sub_pos: string;
      definition: string;
      pos: string;
    }

    interface Dictionary {
      has(word: string): boolean;
      lookup(word: string): DictionarySense[];
    }

    interface Util {
      clean_html(html: string): string;
    }

    interface FastTextClassifierResult {
      label: string;
      value: number;
    }
  }

  interface LanguageIdentificationResult {
    label: string;
  }

  interface LanguageIdentification {
    detect(document: string): Promise<string>;
    getLanguages(document: string, umberLanguagues: number): Promise<LanguageIdentificationResult[]>;
  }

  interface Crfsuite {
    Tagger: CrfsuiteCore.Tagger;
    Trainer: CrfsuiteCore.Trainer;
  }
}

declare module "vntk" {
  function tokenizer(): VNTK.Tokenizer;
  function wordTokenizer(newModelPath?: string): VNTK.WordTokenizer;
  function posTag(newModelPath?: string): VNTK.PosTag;
  function chunking(newModelPath?: string): VNTK.Chunking;
  function ner(newModelPath?: string): VNTK.NamedEntityRecognition;
  function dictionary(): VNTK.Utility.Dictionary;
  function util(): VNTK.Utility.Util;

  class TfIdf {
    public constructor();
    public addDocument(document: string): void;
    public tfidfs(word: string, callback: (i: number, measure: number) => void): void;
  }

  class BayesClassifier {
    public constructor();
    public addDocument(document: string, baye: string): void;
    public train(): void;
    public classify(document: string): string;
  }

  class FastTextClassifier {
    public constructor(modelPath: string);
    public predict(document: string, numberExamples: number, callback: (error: Error, result: VNTK.Utility.FastTextClassifierResult[]) => void): void;
  }

  function langid(newModelPath?: string): VNTK.LanguageIdentification;

  function crfsuite(): VNTK.Crfsuite;
}
