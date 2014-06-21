//!/bin/bash
//
//(Scoville) habamacro/habamacro.sjs
// simple macros to reduce asm.js visual noise
// Copyright 2014 Nathan Ross (nross.se@gmail.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

macro parDec {
	case { $name $x:ident %i } => { 
		return  #{
			$x = $x|0
		}
	}
	case { $name $x:ident %d } => { 
		return  #{
			$x = +$x
		}
	}
}

macro f {
	case { $name $x:ident ($($argtype:ident: $argname:ident) (,) ...) { $body ... } } => { 
		return #{ 
			function $x ($argname ...) {
				$(parDec $argname %$argtype ;) ...
				$body ... 
			} 
		} 
	}
}



macro intDec {
	rule { $varname:ident = $val } => {
		var $varname = $val; 
	}
	rule { $varname:ident } => {
		var $varname = 0;
	}
}

macro dblDec {
	rule { $varname:ident = $val } => {
		var $varname = $val; 
	}
	rule { $varname:ident } => {
		var $varname = 0.1;
	}
}

macro int {
	rule { $statement:invoke(intDec) (,) ...; } => { 
		$statement ...
	}
}
macro dbl {
	rule { $statement:invoke(dblDec) (,) ...; } => { 
		$statement ...
	}
}
