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
    pre-commit
  ];

  pre-commit.hooks = {
    eslint = {
      enable = true;

      files = "\\.[jt]s$";
    };
    nixfmt-rfc-style.enable = true;
    prettier.enable = true;
    shellcheck.enable = true;
    tsc = {
      enable = true;
      entry = "tsc";
      args = [ "--noEmit" ];
      pass_filenames = false;
      files = "\\.ts$";
    };
  };

  tasks = {
    "bun:install" = {
      exec = "bun install";
    };
  };

  enterTest = ''
    bun test
  '';
}
