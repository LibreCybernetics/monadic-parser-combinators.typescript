{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  cachix.enable = false;

  languages = {
    deno = {
      enable = true;
    };

    javascript = {
      enable = true;

      bun.enable = true;
    };

    typescript = {
      enable = true;
    };
  };

  packages = with pkgs; [
    assemblyscript
  ];

  pre-commit.hooks = {
    eslint.enable = true;
    nixfmt-rfc-style.enable = true;
    prettier.enable = true;
    shellcheck.enable = true;
  };
}
