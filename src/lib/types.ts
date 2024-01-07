type CountryName = {
  common: string;
  official: string;
};

type Currency = {
  name: string;
  symbol: string;
};

export type Country = {
  name: { nativeName: Record<string, CountryName> } & CountryName;
  population: number;
  region: string;
  capital: string[];
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
  subregion: string;
  tld: string[];
  currencies: Record<string, Currency>;
  languages: Record<string, string>;
  borders: string[];
};

export namespace Response {
  export type Success<T> = {
    success: true;
    error: null;
    data: T;
  };

  export type Error = {
    success: false;
    error: string;
    data: null;
  };
}

export type Option<T> = {
  label: string;
  value: T;
};
