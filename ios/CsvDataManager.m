//
//  CsvDataManager.m
//  Pokedex
//
//  Created by Sean McGovern on 12/10/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CsvDataManager, NSObject)

RCT_EXTERN_METHOD(saveToJSON)

RCT_EXTERN_METHOD(saveForms)

@end
