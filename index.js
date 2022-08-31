function strict1(str) {
  "use strict";
  return eval(str);
}

function strict2(f, str) {
  "use strict";
  return f(str);
}

function nonStrict(str) {
  return eval(str);
}

strict1("'Strict mode code!'");
strict1("'use strict'; 'Strict mode code!'");

strict2(eval, "'Non-strict code.'");
strict2(eval, "'use strict'; 'Strict mode code!'");

nonStrict("'Non-strict code.'");
nonStrict("'use strict'; 'Strict mode code!'");
