/*
 * Niagara.js - JavaScript MOVE framework
 * Version: @@@VERSION@@@
 * 
 * Copyright (c) 2013 Tim Jansen
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * https://github.com/timjansen/niagara
 */

///#remove

// PLEASE NOTE: this file controls how the Niagara sources and the Minified sources are merged into 
// a single file. You can find the merged files in /dist.
///#/remove

	/*$
	 * @id ALL
	 * @doc no
	 * @required
	 * This id allows identifying whether both Web and Util are available.
	 */
	

if (/^u/.test(typeof define)) { // no AMD support available ? define a minimal version
	(function(def){
		this['define'] = function(name, f) { def[name] = f(); };
		this['require'] = function(name) { return def[name]; };
	})({});
}


define('minified', function() {
///#include ext/minified-web-full-src.js  webVars
///#include ext/minified-util-full-src.js utilVars
///#include ext/minified-util-full-src.js commonFunctions
///#include ext/minified-web-full-src.js  webFunctions
	
///#include ext/minified-extras-full-src.js extrasFunctions
///#include ext/minified-extras-full-src.js extrasDocs
	
///#include ext/minified-util-full-src.js utilM
	
	
	//// LIST FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
	copyObj({
		///#include ext/minified-util-full-src.js utilListFuncs
		///#include ext/minified-web-full-src.js webListFuncs
		///#include ext/minified-extras-full-src.js extrasListFuncs
	}, M.prototype);
	
			
	//// DOLLAR FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///#include ext/minified-web-full-src.js webDollarFuncs
	

	//// UNDERSCORE FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	copyObj({
		///#include ext/minified-util-full-src.js utilUnderscoreFuncs
		///#include ext/minified-extras-full-src.js extrasUnderscoreFuncs
	}, _);
	

	////INITIALIZATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///#include ext/minified-web-full-src.js webInit


	return {
		///#include ext/minified-extras-full-src.js extrasExports
		///#include ext/minified-util-full-src.js utilExports
		///#include ext/minified-web-full-src.js webExports
	};

///#include ext/minified-web-full-src.js  commonAmdEnd

	
	