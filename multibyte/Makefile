all: hello.utf8 hello.sjis hello.utf16

ifeq ($(shell which iconv),)
  $(error iconv is not installed)
endif

%.utf8 : %.txt
	iconv -f UTF-8 -t UTF-8 $< >$@ ;$(if $(shell which nkf), nkf --guess $@,)

%.utf16 : %.txt
	iconv -f UTF-8 -t UTF-16 $< >$@ ;$(if $(shell which nkf), nkf --guess $@,)

%.sjis : %.txt
	iconv -f UTF-8 -t Shift_JIS $< >$@ ;$(if $(shell which nkf), nkf --guess $@,)

clean:
	rm -f hello.utf8 hello.sjis hello.utf16

.PHONY: all clean

