﻿using System.Collections;
using System.Collections.Generic;
using Telerik.Sitefinity.Abstractions.VirtualPath;

namespace Telerik.Sitefinity.Frontend.Resources.Resolvers
{
    /// <summary>
    /// Classes that implement this interface should act as a node in a resource resolver chain.
    /// </summary>
    public interface IResourceResolverNode : IVirtualFileResolver
    {
        /// <summary>
        /// Sets the next resolver in the chain.
        /// </summary>
        /// <param name="resolver">The next resolver.</param>
        /// <returns>The next resolver.</returns>
        IResourceResolverNode SetNext(IResourceResolverNode resolver);

        /// <summary>
        /// Gets the next resolver in the chain.
        /// </summary>
        /// <value>
        /// The next resolver in the chain.
        /// </value>
        IResourceResolverNode Next { get; }

        /// <summary>
        /// Gets the available files in the given path.
        /// </summary>
        /// <param name="definition">The definition.</param>
        /// <param name="path">The path.</param>
        IEnumerable<string> GetAvailableFiles(PathDefinition definition, string path);
    }
}
